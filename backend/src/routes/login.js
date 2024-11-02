import express from 'express';
import { pool } from '../app.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    try {
      
      const result = await pool.query(query);

      if (result.rows.length > 0) {
        res.status(200).send("Login successfuly");
      } else {
        res.status(404).send('Invalid username or password');
      }
    } catch (error) {
      console.log('Internal Server Error', error);
    }
  });

export default router;