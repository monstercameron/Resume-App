require('dotenv').config();
const MySQL = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connect = async () => {
    const connection = await MySQL.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
    });
    return connection;
};

// create tables

