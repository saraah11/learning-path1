import express from "express";
import cors from "cors";
import pg from "pg";
import userRouter from "./routes/login.js";
import moviesRouter from "./routes/movies.js";
import hpp from "hpp";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// Initialization of our express app
const app = express();

// Some middlewares
app.use(
  cors()
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp({ whitelist: ["ratings"] }));

// Initialization of our database client
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CERT,
  },
};

// Make a connection with database
const pool = new pg.Pool(config);

// Make the application start using our routes
app.use("/login", userRouter);
app.use("/movies", moviesRouter);

// Export the app and pool
export default app; // Default export for app
export { pool };
