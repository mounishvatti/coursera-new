import { Client } from 'pg';

// Fetch the connection URL from environment variables
const client = new Client({
  connectionString: process.env.DATABASE_URL,  // This should be the full connection string provided by Neon
  ssl: {
    rejectUnauthorized: false, // You might need to disable SSL certificate validation in serverless environments
  },
});

const conn = client.connect();  // Establish a connection

export default conn;