const { conectar } = require('./conexion');

//// User
const get = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM users");
    conexion.release();
    return result.rows;
}
const getUserData = async () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * FROM
        users as usr, posts as pst, todos as tds 
        WHERE pst.userid = usr.id and tds.userid = usr.id`);
    conexion.release();
    return result.rows[0];
}
const getUserDataById = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * FROM
        users as usr, posts as pst, todos as tds 
        WHERE usr.id = $1 and pst.userid = usr.id and tds.userid = usr.id`, [userId]);
    conexion.release();
    return result.rows[0];
}
const saveUser = async (user) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            users(id, nombre, username, email, phone, website) 
                        VALUES($1, $2, $3, $4, $5, $6) 
                        RETURNING *`;
        const values = [user.id, user.nombre, user.username, user.email, user.phone, user.website];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const getUserPost = (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM posts as pst, users as usr WHERE usr.id = pst.userid and usr.id = $1", [userId]);
    conexion.release();
    return result.rows[0];
}
const getUserAlbums = (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM albums as albm, users as usr WHERE usr.id = albm.userid and usr.id = $1", [userId]);
    conexion.release();
    return result.rows[0];
}
const getUserTodos = (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM todos as tds, users as usr WHERE usr.id = tds.userid and usr.id = $1", [userId]);
    conexion.release();
    return result.rows[0];
}
const deleteUserById = (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE users WHERE id = $1", [userId]);
    conexion.release();
    return result.rows[0];
}
//// User End

//// Post
const getPostData = () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * posts as psts, users as usr, comments as cmts 
        FROM 
        psts.userid = usr.id and psts.id = cmts.postid`);
    conexion.release();
    return result.rows[0];
}
const getPostDataById = (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * posts as psts, users as usr, comments as cmts 
        FROM 
        psts.id = $1 and psts.userid = usr.id and psts.id = cmts.postid`, [postId]);
    conexion.release();
    return result.rows[0];
}
const getPostCommentsById = (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * posts as psts, comments as cmts 
        FROM 
        psts.id = $1 and psts.id = cmts.postid`, [postId]);
    conexion.release();
    return result.rows[0];
}
const deletePostById = (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE posts WHERE id = $1", [postId]);
    conexion.release();
    return result.rows[0];
}
//// Post End

//// Comment

//// Comment End

//// Album

//// Album End

//// Photo

//// Photo End

//// Todo

//// Todo End

exports.get = get;
exports.getUserData = getUserData;
exports.getUserDataById = getUserDataById;
exports.deleteUserById = deleteUserById;
exports.getUserAlbums = getUserAlbums;
exports.getUserTodos = getUserTodos;
exports.getUserPost = getUserPost;
exports.getUserById = getUserById;
exports.saveUser = saveUser;