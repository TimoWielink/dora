const { Pool } = require('pg');
require('dotenv').config();
const connectionString = process.env.DATABASE_URL; // Ensure this is set up correctly

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const createTableQuery = `
CREATE TABLE users_prompts (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    prompt_return TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;



pool.query(createTableQuery, (err, res) => {
    if (err) {
        console.error("Error creating table:", err);
    } else {
        console.log("Table created successfully!");
    }
    pool.end();
});
