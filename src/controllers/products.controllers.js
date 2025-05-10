import { pool } from '../db.js'; 

export const getProducts = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM products');
    res.json(rows);
};


export const getProduct = async (req, res) => {
    const { id } = req.params;
    const {rows} = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(400).json('product con id ' + id + ' no encontrado');
    }
    res.json(rows);
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, image, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "Nombre y precio son campos obligatorios." });
        }

        const result = await pool.query(
            "INSERT INTO products (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *", 
            [name, description, image, price]
        );

        console.log(result.rows[0]); 
        res.status(201).json({ message: "Producto creado exitosamente", product: result.rows[0] });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// export const deleteProduct = async (req, res) => {
//     const { id } = req.params;
//     const { rowCount } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

//     if (rowCount === 0) {
//         return res.status(400).json({ messege: 'product no encontrado'});
//     }
   
//     return res.sendStatus(204);
// };


export const deleteProduct = async (req, res) => {
const { id } = req.params;
  
  try {
    // Primero eliminar las notas de fragancia asociadas
    await pool.query('DELETE FROM product_fragrance_notes WHERE product_id = $1', [id]);
    
    // Luego eliminar el producto
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const {rows} = await pool.query('UPDATE products SET name = $1, description = $2, price = $3, image = $4  WHERE id = $5 RETURNING *',
        [data.name, data.description, data.price, data.image, id]);

    return res.json(rows[0]);
};