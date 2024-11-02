import express from 'express';
import { pool } from '../app.js';

const router = express.Router();

// Vulnerable route to demonstrate parameter pollution
router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const { sort, ratings } = req.query;
    
        // Default query
        let query = 'SELECT * FROM MOVIES';
        let queryParams = [];
    
        // code the allow only one parameter
        if (ratings) {
            queryParams.push(ratings);
            query += ` WHERE ratings = $${queryParams.length}`;
        }


      // Sorting
      if (sort) {
        // Dangerous - Directly concatenating unsanitized sort column
        query += ` ORDER BY ${sort}`;
      }
  
      // Fetching data from database
      const data = await pool.query(query, queryParams);
      res.send(data.rows);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  
export default router;