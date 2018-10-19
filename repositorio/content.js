const { conectar } = require('./conexion');

//// User
const getUsers = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM users");
    conexion.release();
    return result.rows;
}
const getUsersById = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM users WHERE id = $1", [userId]);
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
                            users(name, username, email, phone, website) 
                        VALUES($1, $2, $3, $4, $5) 
                        RETURNING *`;
        const values = [user.name, user.username, user.email, user.phone, user.website];

        const res = await conexion.query(text, values);
        conexion.release();
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const getUserPost = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM posts WHERE userid = $1", [userId]);
    conexion.release();
    return result.rows;
}
const getUserAlbums = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM albums WHERE userid = $1", [userId]);
    conexion.release();
    return result.rows;
}
const getUserTodos = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM todos WHERE userid = $1", [userId]);
    conexion.release();
    return result.rows;
}
const deleteUserById = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE FROM users WHERE id = $1", [userId]);
    conexion.release();
    return result;
}
const updateUser = async (user) => {
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
const getPosts = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM posts");
    conexion.release();
    return result.rows;
}
const getPostsUser = async (postId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT us.id, us.name, us.username, " +
        "us.email, us.phone, us.website FROM posts ps, users us WHERE ps.userid = us.id AND ps.id = $1", [postId]);
    conexion.release();
    return result.rows;
}
const getPostsComments = async (postId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT cm.id, cm.postid, cm.name, " +
        "cm.email, cm.body FROM posts ps, comments cm WHERE ps.id = cm.postid AND ps.id = $1", [postId]);
    conexion.release();
    return result.rows;
}
const getPostDataById = async (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * 
        FROM posts psts
        WHERE psts.id = $1`, [postId]);
    conexion.release();
    return result.rows[0];
}
const savePost = async (post) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            posts(userid, title, body) 
                        VALUES($1, $2, $3) 
                        RETURNING *`;
        const values = [post.userid, post.title, post.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deletePostById = async (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "delete from posts where id=$1", [postId]);
    conexion.release();
    return result;
}
const updatePost = async (post) => {
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
const getComments = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM comments");
    conexion.release();
    return result.rows;
}
const getCommentPost = async (commentId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "SELECT * FROM comments as cmts, posts as psts WHERE psts.id=$1 and cmts.postid=psts.id", [commentId]);
    conexion.release();
    return result.rows;
}
const getCommentDataById = async (postId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * from comments as cmts 
        where 
        cmts.id = $1`, [postId]);
    conexion.release();
    return result.rows[0];
}
const saveComment = async (comment) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            comments(postid, name, email, body) 
                        VALUES($1, $2, $3, $4) 
                        RETURNING *`;
        const values = [comment.postid, comment.name, comment.email, comment.body];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deleteCommentById = async (commentId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE from comments WHERE id = $1", [commentId]);
    conexion.release();
    return result;
}
const updateComment = async (comment) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE comments
                        SET postid = $2, name = $3, email = $4, body = $5
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
const getAlbums = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM albums");
    conexion.release();
    return result.rows;
}
const getAlbumsPhotos = async (idAlbum) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM albums as albms, photos as phts WHERE albms.id=$1 and  phts.albumid = albms.id", [idAlbum]);
    conexion.release();
    return result.rows;
}
const getAlbumData = async () => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        alb.id = pht.albumid`);
    conexion.release();
    return result.rows[0];
}
const getAlbumById = async (albumId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * from albums as alb 
        where
        alb.id = $1`, [albumId]);
    conexion.release();
    return result.rows[0];
}
const getAlbumPhotosById = async (albumId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * albums as alb, photos as pht 
        FROM 
        alb.id = $1 and alb.id = pht.albumid`, [albumId]);
    conexion.release();
    return result.rows[0];
}
const saveAlbum = async (album) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            albums(userid, title) 
                        VALUES($1, $2) 
                        RETURNING *`;
        const values = [album.userid, album.title];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deleteAlbumById = async (albumId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE from albums WHERE id = $1", [albumId]);
    conexion.release();
    return result;
}
const updateAlbum = async (album) => {
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
const getPhotos = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM photos");
    conexion.release();
    return result.rows;
}
const getPhotosAlbums = async (idPhoto) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * from albums as alb, photos as pht 
        where
        alb.id = pht.albumid and pht.id = $1`, [idPhoto]);
    conexion.release();
    return result.rows;
}
const getPhotosById = async (photosId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * from photos as pht 
        where
        pht.id = $1`, [photosId]);
    conexion.release();
    return result.rows[0];
}
const savePhoto = async (album) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            photos(albumid, title, url, thumbnailurl) 
                        VALUES($1, $2, $3, $4) 
                        RETURNING *`;
        const values = [album.albumid, album.title, album.url, album.thumbnailurl];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deletePhotoById = async (photosId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE from photos WHERE id = $1", [photosId]);
    conexion.release();
    return result;
}
const updatePhoto = async (photo) => {
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
const getTodos = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM todos");
    conexion.release();
    return result.rows;
}
const getTodosUser = async (idUser) => {
    const conexion = await conectar();
    const result = await conexion.query(
        `SELECT * from users as usr 
        where
        usr.id = $1`, [idUser]);
    conexion.release();
    return result.rows[0];
}
const getTodosById = async (todoId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * from todos where todos.id=$1", [todoId]);
    conexion.release();
    return result.rows[0];
}
const saveTODO = async (todo) => {
    try {
        const conexion = await conectar();
        const text = `INSERT INTO 
                            todos(userid, title, completed) 
                        VALUES($1, $2, $3) 
                        RETURNING *`;
        const values = [todo.userid, todo.title, todo.completed];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
const deleteTODOById = async (todoId) => {
    const conexion = await conectar();
    const result = await conexion.query(
        "DELETE from todos WHERE id = $1", [todoId]);
    conexion.release();
    return result;
}
const updateTODO = async (TODO) => {
    try {
        const conexion = await conectar();
        const text = `UPDATE todos
                        SET  userid = $2, title = $3, completed = $4
                        WHERE id = $1
                        RETURNING *`;
        const values = [TODO.id, TODO.userid, TODO.title, TODO.completed];
        const res = await conexion.query(text, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}
//// Todo End

//// addresses
const getAddresses = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM addresses");
    conexion.release();
    return result.rows;
}
const getAddressesById = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM addresses WHERE userid = $1", [userId]);
    conexion.release();
    return result.rows;
}
//// end addresses

//// companies
const getCompanies = async () => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM companies");
    conexion.release();
    return result.rows;
}
const getCompaniesById = async (userId) => {
    const conexion = await conectar();
    const result = await conexion.query("SELECT * FROM companies WHERE userid = $1", [userId]);
    conexion.release();
    return result.rows;
}
exports.getUsers = getUsers;
exports.getPosts = getPosts;
exports.updateUser = updateUser;
exports.getPostsUser = getPostsUser;
exports.getTodos = getTodos;
exports.getAlbumsPhotos = getAlbumsPhotos;
exports.savePost = savePost;
exports.getPhotos = getPhotos;
exports.getTodosUser = getTodosUser;
exports.saveAlbum = saveAlbum;
exports.getAlbums = getAlbums;
exports.getPhotosById = getPhotosById;
exports.saveComment = saveComment;
exports.updatePhoto = updatePhoto;
exports.deleteAlbumById = deleteAlbumById;
exports.getAlbumById = getAlbumById;
exports.updateTODO = updateTODO;
exports.updateComment = updateComment;
exports.savePhoto = savePhoto;
exports.getPhotosAlbums = getPhotosAlbums;
exports.deleteCommentById = deleteCommentById;
exports.getCommentDataById = getCommentDataById;
exports.getComments = getComments;
exports.updateAlbum = updateAlbum;
exports.getCommentPost = getCommentPost;
exports.deletePostById = deletePostById;
exports.saveTODO = saveTODO;
exports.updatePost = updatePost;
exports.deletePhotoById = deletePhotoById;
exports.getPostDataById = getPostDataById;
exports.getPostsComments = getPostsComments;
exports.getAddresses = getAddresses;
exports.getCompanies = getCompanies;
exports.getAddressesById = getAddressesById;
exports.getCompaniesById = getCompaniesById;
exports.getUsersById = getUsersById;
exports.getUserDataById = getUserDataById;
exports.deleteUserById = deleteUserById;
exports.getTodosById = getTodosById;
exports.deleteTODOById = deleteTODOById;
exports.getUserAlbums = getUserAlbums;
exports.getUserTodos = getUserTodos;
exports.getUserPost = getUserPost;
exports.saveUser = saveUser;