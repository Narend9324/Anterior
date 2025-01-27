import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure DATABASE_URL is set in your .env file
});

export const query = (text, params) => pool.query(text, params);
