import { pool } from '../db.js'; 
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from "../config.js";



export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const userFound = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userFound.rows.length === 1) return res.status(400).json([ "The email is already in use" ]);

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertar el usuario en la base de datos
        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );
        const userSaved = await result.rows[0] 
        // res.status(201).json({ message: "Usuario creado exitosamente", userSaved: result.rows[0] });
        const token = await createAccessToken({ id: userSaved.id});
        res.cookie('token', token)
        res.status(201).json({
            id: userSaved.id,
            name: userSaved.name,
            email: userSaved.email,
            created_at: userSaved.created_at,
        });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario por email
        const userFound = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userFound.rows.length === 0) return res.status(400).json({ message: "User not found" });

        const user = userFound.rows[0]; // Accede al primer usuario encontrado

        // Compara la contraseña proporcionada con la contraseña encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

        // Crea un token de acceso
        const token = await createAccessToken({ id: user.id });

        // Establece la cookie con el token
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        });

        // Devuelve los datos del usuario
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
        });
    } catch (error) {
        console.error("Error al logear el usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};


export const profile = async (req, res) => {
    // console.log(req.user)
    const { id } = req.user;

    const userFound = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userFound.rows.length === 0) return res.status(400).json({ message: "User not found" });
    const user = userFound.rows[0];
    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
    });
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await pool.query('SELECT * FROM users WHERE id = $1', [user.id]);
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
        });
    });
};