const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pacientes',
    password: 'l_301',
});

const conectar = async () => {
    const client = await pool.connect();
    return client;   
}

exports.conectar = conectar;
