const { assert } = require('chai');

exports.esPersonaObject = (data) => {
    assert.hasAllKeys(data, ['id', 'nombre', 'apellidos', 'edad']);
}