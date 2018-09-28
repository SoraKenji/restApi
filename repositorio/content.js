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
const updateUser = (user) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE users
                        SET name = $2, username = $3, email = $4, phone = $5, website = $6
                        WHERE id = $1
                        RETURNING *`;
        const values = [user.id, user.name, user.username, user.email, user.phone, user.website];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
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
const savePost = (post) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            posts(id, userid, title, body) 
                        VALUES($1, $2, $3, $4) 
                        RETURNING *`;
        const values = [post.id, post.userid, post.title, post.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deletePostById = (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE posts WHERE id = $1", [postId]);
    conexion.release();
    return result.rows[0];
}
const updatePost = (post) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE posts
                        SET userid = $2, title = $3, body = $4,
                        WHERE id = $1
                        RETURNING *`;
        const values = [post.id, post.userid, post.title, post.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
//// Post End

//// Comment
const getCommentData = () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * Comments as psts, comments as cmts 
        FROM 
        psts.id = cmts.Commentid`);
    conexion.release();
    return result.rows[0];
}
const getCommentDataById = (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * posts as psts, comments as cmts 
        FROM 
        psts.id = $1 and psts.id = cmts.postid`, [postId]);
    conexion.release();
    return result.rows[0];
}
const saveComment = (comment) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            comments(id, postid, name, email, body) 
                        VALUES($1, $2, $3, $4, $5) 
                        RETURNING *`;
        const values = [comment.id, comment.commentid, comment.name, comment.email, comment.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deleteCommentById = (commentId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE comments WHERE id = $1", [commentId]);
    conexion.release();
    return result.rows[0];
}
const updateComment = (comment) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE comments
                        SET  postid = $2, name = $3, body = $4, email = $5,
                        WHERE id = $1
                        RETURNING *`;
        const values = [comment.id, comment.postid, comment.name, comment.email, comment.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
//// Comment End

//// Album
const getAlbumData = () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        alb.id = pht.albumid`);
    conexion.release();
    return result.rows[0];
}
const getAlbumDataById = (albumId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        alb.id = $1 and alb.id = pht.albumid`, [albumId]);
    conexion.release();
    return result.rows[0];
}
const getAlbumPhotosById = (albumId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        alb.id = $1 and alb.id = pht.albumid`, [albumId]);
    conexion.release();
    return result.rows[0];
}
const saveAlbum = (album) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            albums(id, userid, title) 
                        VALUES($1, $2, $3) 
                        RETURNING *`;
        const values = [Album.id, Album.commentid, Album.name, Album.email, Album.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deleteAlbumById = (albumId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE albums WHERE id = $1", [albumId]);
    conexion.release();
    return result.rows[0];
}
const updateAlbum = (album) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE albums
                        SET  userid = $2, title = $3
                        WHERE id = $1
                        RETURNING *`;
        const values = [album.id, album.userid, album.title];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
//// Album End

//// Photo
const getPhotosData = () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        alb.id = pht.albumid`);
    conexion.release();
    return result.rows[0];
}
const getPhotosDataById = (photosId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        pht.id = $1 and alb.id = pht.albumid`, [photosId]);
    conexion.release();
    return result.rows[0];
}
const savePhoto = (album) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            photos(id, albumid, title, url, thumbnailurl) 
                        VALUES($1, $2, $3, $4, $5) 
                        RETURNING *`;
        const values = [Album.id, Album.albumid, Album.title, Album.url, Album.thumbnailurl];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deletePhotoById = (photosId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE photos WHERE id = $1", [photosId]);
    conexion.release();
    return result.rows[0];
}
const updatePhoto = (photo) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE photos
                        SET  albumid = $2, title = $3, url = $4, thumbnailurl = $5
                        WHERE id = $1
                        RETURNING *`;
        const values = [photo.id, photo.albumid, photo.title, photo.url, photo.thumbnailurl];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
//// Photo End

//// Todo
const getTodos = () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * todos as tds, users as usr 
        FROM 
        todos.userid = usr.id`);
    conexion.release();
    return result.rows[0];
}
const saveTodos = (todo) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            todos(id, userid, title, completed) 
                        VALUES($1, $2, $3, $4) 
                        RETURNING *`;
        const values = [todo.id, todo.userid, todo.title, todo.completed];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
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