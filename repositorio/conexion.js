const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'jsonPlaceHolder',
    password: 'newPassword',
});

const conectar = async () => {
    const client = await pool.connect();
    return client;
}

exports.conectar = conectar;
