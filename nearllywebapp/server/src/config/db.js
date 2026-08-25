import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const checkDatabaseConnection = async () => {
  try {
    await pool.query('SELECT NOW()');

    console.log('PostgreSQL database connected successfully');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message);
  }
};

checkDatabaseConnection();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err.message);
});



export default pool;
