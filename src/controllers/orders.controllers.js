import { pool } from '../db.js'; 

export const getOrders = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM orders');
    res.json(rows);
};


export const getOrder = async (req, res) => {
    const { id } = req.params;
    const {rows} = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(400).json('order con id ' + id + ' no encontrado');
    }
    res.json(rows);
};


export const createOrder = async (req, res) => {
    try {
    
        const { product_id } = req.body;
        const user_id = req.user.id;

        console.log("ID del usuario logeado:", user_id);

              if (!product_id) {
            return res.status(400).json({ error: 'El product_id es requerido' });
        }

        const { rows } = await pool.query(
            'INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING *',
            [user_id, product_id]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error al crear la orden:", error); 
        res.status(500).json({ error: 'Error al crear la orden', details: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query('DELETE FROM orders WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la orden', details: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, product_id } = req.body;

        if (!user_id || !product_id) {
            return res.status(400).json({ error: 'user_id y product_id son requeridos' });
        }

        const { rowCount, rows } = await pool.query(
            'UPDATE orders SET user_id = $1, product_id = $2 WHERE id = $3 RETURNING *',
            [user_id, product_id, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la orden', details: error.message });
    }
};