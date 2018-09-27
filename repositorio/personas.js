const { conectar } = require('./conexion');

const get = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM pacientes");
    conexion.release();
    return result.rows;
}

const getById = async (personaId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM pacientes WHERE id = $1", [personaId]);
    conexion.release();
    return result.rows[0];
}

const save = async (persona) => {
    try {
        const conexion = await conectar();
        const text = `  INSERT INTO 
                            pacientes(nombre, apellidos, edad) 
                        VALUES($1, $2, $3) 
                        RETURNING *`;
        const values = [persona.nombre, persona.apellidos, persona.edad];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

exports.get = get;
exports.getById = getById;
exports.save = save;