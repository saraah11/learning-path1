import express from 'express';
const router = express.Router();
import { pool } from '../app.js';

router.get('/', async (req, res) => {
    let searchTerm = req.query.q || ''; 
    try {
        // Vulnerable SQL query using string interpolation without parameterization
        const query = `
            SELECT * FROM blogs
            WHERE LOWER(title) LIKE LOWER('%${searchTerm}%');
        `;
        const result = await pool.query(query);

        // Echo the search term unsafely in the response for demonstration purposes
        res.send({
            searchTerm: searchTerm,  // This is returned as raw in the response
            results: result.rows     // Data fetched from database
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
