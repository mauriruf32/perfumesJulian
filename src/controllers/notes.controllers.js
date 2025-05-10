import { pool } from '../db.js'; 

export const getNotes = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM fragrance_notes');
    res.json(rows);
};


export const getNote = async (req, res) => {
    const { id } = req.params;
    const {rows} = await pool.query('SELECT * FROM fragrance_notes WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(400).json('note con id ' + id + ' no encontrado');
    }
    res.json(rows);
};


export const createNote = async (req, res) => {
    try {
        const { name } = req.body;
        const user_id = req.user.id;

        console.log("ID del usuario logeado:", user_id);

        if (!name) {
            return res.status(400).json({ error: 'El nombre de la nota es requerido' });
        }

        const { rows } = await pool.query(
            'INSERT INTO fragrance_notes (name) VALUES ($1) RETURNING *',
            [name]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error al crear la nota de fragancia:", error); 
        res.status(500).json({ 
            error: 'Error al crear la nota de fragancia', 
            details: error.message 
        });
    }
};0

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query('DELETE FROM fragance_notes WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'fragance_notes no encontrada' });
        }

        res.status(200).json({ message: 'fragance_notes eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la fragance_notes', details: error.message });
    }
};

export const deleteProductWhitNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query('DELETE FROM product_fragrance_notes WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'fragance_notes no encontrada' });
        }

        res.status(200).json({ message: 'fragance_notes eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la fragance_notes', details: error.message });
    }
};

export const assignNoteToProduct = async (req, res) => {
    try {
        const { product_id, note_id, position } = req.body;

        // Validaciones básicas
        if (!product_id || !note_id || !position) {
            return res.status(400).json({ 
                error: 'product_id, note_id y position son requeridos' 
            });
        }

        if (position < 1 || position > 8) {
            return res.status(400).json({ 
                error: 'La posición debe estar entre 1 y 8' 
            });
        }

        // Insertar la relación directamente
        const { rows } = await pool.query(
            `INSERT INTO product_fragrance_notes 
             (product_id, note_id, position) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [product_id, note_id, position]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        console.error("Error al asignar nota al roducto:", error);
        
        // Manejo básico de errores
        res.status(500).json({ 
            error: 'Error al asignar nota al producto',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};




export const getProductsWithNotes = async (req, res) => {
    try {
        // Consulta para obtener todos los productos con sus notas asociadas
        const query = `
            SELECT 
                p.id AS product_id,
                p.name AS product_name,
                p.description,
                p.image,
                p.price,
                p.created_at,
                json_agg(
                    json_build_object(
                        'note_id', fn.id,
                        'note_name', fn.name,
                        'position', pfn.position
                    ) ORDER BY pfn.position
                ) AS fragrance_notes
            FROM 
                products p
            LEFT JOIN 
                product_fragrance_notes pfn ON p.id = pfn.product_id
            LEFT JOIN 
                fragrance_notes fn ON pfn.note_id = fn.id
            GROUP BY 
                p.id
            ORDER BY 
                p.created_at DESC;
        `;

        const { rows } = await pool.query(query);

        // Formatear la respuesta
        const formattedProducts = rows.map(product => ({
            ...product,
            fragrance_notes: product.fragrance_notes[0] ? product.fragrance_notes : []
        }));

        res.status(200).json({
            success: true,
            count: formattedProducts.length,
            data: formattedProducts
        });

    } catch (error) {
        console.error('Error al obtener productos con notas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos con sus notas de fragancia',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


export const getProductWithNotesById = async (req, res) => {
    try {
        const productId = req.params.id;

        // Consulta para un producto específico
        const query = `
            SELECT 
                p.id AS product_id,
                p.name AS product_name,
                p.description,
                p.image,
                p.price,
                p.created_at,
                json_agg(
                    json_build_object(
                        'note_id', fn.id,
                        'note_name', fn.name,
                        'position', pfn.position
                    ) ORDER BY pfn.position
                ) AS fragrance_notes
            FROM 
                products p
            LEFT JOIN 
                product_fragrance_notes pfn ON p.id = pfn.product_id
            LEFT JOIN 
                fragrance_notes fn ON pfn.note_id = fn.id
            WHERE 
                p.id = $1
            GROUP BY 
                p.id;
        `;

        const { rows } = await pool.query(query, [productId]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Formatear la respuesta
        const product = {
            ...rows[0],
            fragrance_notes: rows[0].fragrance_notes[0] ? rows[0].fragrance_notes : []
        };

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error('Error al obtener producto con notas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto con sus notas de fragancia',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};



// export const updateNote = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { user_id, product_id } = req.body;

//         if (!user_id || !product_id) {
//             return res.status(400).json({ error: 'user_id y product_id son requeridos' });
//         }

//         const { rowCount, rows } = await pool.query(
//             'UPDATE orders SET user_id = $1, product_id = $2 WHERE id = $3 RETURNING *',
//             [user_id, product_id, id]
//         );

//         if (rowCount === 0) {
//             return res.status(404).json({ error: 'Orden no encontrada' });
//         }

//         res.status(200).json(rows[0]);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al actualizar la orden', details: error.message });
//     }
// };