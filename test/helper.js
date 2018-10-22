const { assert } = require('chai');

exports.esPersonaObject = (data) => {
    assert.hasAllKeys(data, ['id', 'nombre', 'apellidos', 'edad']);
}

exports.esUserObject = (data) => {
    assert.hasAllKeys(data, ['id', 'name', 'username', 'email', 'phone', 'website']);
}

exports.esPostObject = (data) => {
    assert.hasAllKeys(data, ['id', 'userid', 'title', 'body']);
}

exports.esAlbumObject = (data) => {
    assert.hasAllKeys(data, ['id', 'userid', 'title']);
}

exports.esCommentObject = (data) => {
    assert.hasAllKeys(data, ['id', 'postid', 'name', 'email', 'body']);
}

exports.esTODOObject = (data) => {
    assert.hasAllKeys(data, ['id', 'userid', 'title', 'completed']);
}