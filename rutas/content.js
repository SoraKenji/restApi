const router = require('express').Router();
const contentRepo = require('../repositorio/content')
const validator = require('../validador/validador');

const consultaById = async (fieldName, id, tablename) => {
    if (tablename == 'users') {
        if (fieldName == 'posts') {
            return await contentRepo.getUserPost(id);
        } else if (fieldName == 'albums') {
            return await contentRepo.getUserAlbums(id);
        } else if (fieldName == 'todos') {
            return await contentRepo.getUserTodos(id);
        }
        return [];
    }
    if (tablename == 'posts') {
        if (fieldName == 'user') {
            return await contentRepo.getPostsUser(id);
        } else if (fieldName == 'comments') {
            return await contentRepo.getPostsComments(id);
        }
        return [];
    }
};

//// USERS
router.get('/users/:userid', async (req, res, next) => {
    try {
        const id = req.params.userid;
        let queryfields = [];
        if (req.query.hasOwnProperty('fields')) {
            const re = /,/g;
            if (!re.test(req.query.fields)) {
                queryfields = [req.query.fields];
            } else {
                queryfields = req.query.fields.split(',');
            }
        }
        let users = await contentRepo.getUsersById(id);
        const addresses = await contentRepo.getAddressesById(id);
        const companies = await contentRepo.getCompaniesById(id);

        users.address = new Array();
        addresses.forEach(address => {
            users.address.push({
                street: address.street,
                suite: address.suite,
                city: address.city,
                zipcode: address.zipcode,
                geo: {
                    lat: address.lat,
                    lng: address.lng,
                }
            });
        });
        users.company = new Array();
        companies.forEach(company => {
            users.company.push(company);
        });
        if (queryfields.length > 0) {
            for (const element of queryfields) {
                const content = await consultaById(element, id, 'users');
                users[element] = content;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        if (!users) {
            res.status(400).send('');
            return;
        }
        res.status(200).send(JSON.stringify({ users }, null, 4));

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users', async (req, res, next) => {
    try {
        let users = await contentRepo.getUsers();

        const addresses = await contentRepo.getAddresses();
        const companies = await contentRepo.getCompanies();
        let queryfields = [];
        if (req.query.hasOwnProperty('fields')) {
            const re = /,/g;
            if (!re.test(req.query.fields)) {
                queryfields = [req.query.fields];
            } else {
                queryfields = req.query.fields.split(',');
            }
        }
        for (let user of users) {
            const addressOfUser = addresses.filter(a =>
                a.userid === user.id);
            user.address = new Array();
            addressOfUser.forEach(address => {
                user.address.push({
                    street: address.street,
                    suite: address.suite,
                    city: address.city,
                    zipcode: address.zipcode,
                    geo: {
                        lat: address.lat,
                        lng: address.lng,
                    }
                });
            });
            const companyOfUser = companies.filter(c =>
                c.userid === user.id);
            user.company = new Array();
            companyOfUser.forEach(company => {
                user.company.push(company);
            });
            if (queryfields.length > 0) {
                for (const element of queryfields) {
                    const content = await consultaById(element, user.id, 'users');
                    if (content.length > 0) {
                        user[element] = new Array();
                        content.forEach(cont => {
                            user[element].push(cont);
                        });
                    }
                }
            }
        }
        res.setHeader('Content-Type', 'application/json');
        if (!users) {
            res.status(404).send('');
            return
        }
        res.status(200).send(JSON.stringify({ users }, null, 4));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users/:userid/posts', async (req, res, next) => {
    try {
        const id = req.params.userid;
        const post = await contentRepo.getUserPost(id);
        if (!post) {
            res.status(404).send('not found')
            return
        }
        res.status(200).send(JSON.stringify({ post }, null, 4));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users/:userid/albums', async (req, res, next) => {
    try {
        const id = req.params.userid;
        const albums = await contentRepo.getUserAlbums(id);
        res.setHeader('Content-Type', 'application/json');
        if (!albums) {
            res.status(404).send('not found')
            return
        }
        res.status(200).send(JSON.stringify({ albums }));
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
    }
});

router.get('/users/:userid/todos', async (req, res, next) => {
    try {
        const id = req.params.userid;
        let todos = await contentRepo.getUserTodos(id);
        res.setHeader('Content-Type', 'application/json');
        if (!todos) {
            res.status(404).send('not found')
            return
        }
        res.status(200).send(JSON.stringify({ todos }, null, 4));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/users/:userid', async (req, res, next) => {
    try {
        const id = req.params.userid;
        const resultado = await contentRepo.deleteUserById(id);
        res.setHeader('Content-Type', 'application/json');
        if (!resultado) {
            res.status(404);
            return;
        }
        res.status(200).send(`La consulta ha eliminado ${resultado.rowCount} registro/s`);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
    }
});

router.post('/users', async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const respuesta = validator.esUser(req.body);
        if (Object.keys(respuesta).length === 0 && respuesta.constructor === Object) {
            const resultado = await contentRepo.saveUser(req.body);
            if (!resultado) {
                res.status(404);
                return;
            }
            res.status(200).send(resultado);
        } else {
            res.status(400).send(respuesta);
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
    }
});
//// END USERS

//// POST
router.get('/post', async (req, res, next) => {
    try {
        let posts = await contentRepo.getPosts();

        let queryfields = [];
        if (req.query.hasOwnProperty('fields')) {
            const re = /,/g;
            if (!re.test(req.query.fields)) {
                queryfields = [req.query.fields];
            } else {
                queryfields = req.query.fields.split(',');
            }
        }
        for (let post of posts) {
            if (queryfields.length > 0) {
                for (const element of queryfields) {
                    const content = await consultaById(element, post.id, 'posts');
                    if (content.length > 0) {
                        post[element] = new Array();
                        content.forEach(cont => {
                            post[element].push(cont);
                        });
                    }
                }
            }
        }
        res.setHeader('Content-Type', 'application/json');
        if (!posts) {
            res.status(404).send('');
            return
        }
        res.status(200).send(JSON.stringify({ posts }, null, 4));
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
    }
});

router.post('/post', async (req, res, next) => {
    try {

    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
    }
});

router.get('/post/:postId', async (req, res, next) => {
    try {
        const id = req.params.postId;
        let post = await contentRepo.getPostDataById(id);
        let queryfields = [];
        if (req.query.hasOwnProperty('fields')) {
            const re = /,/g;
            if (!re.test(req.query.fields)) {
                queryfields = [req.query.fields];
            } else {
                queryfields = req.query.fields.split(',');
            }
        }
        if (queryfields.length > 0) {
            for (const element of queryfields) {
                const content = await consultaById(element, post.id, 'posts');
                if (content.length > 0) {
                    post[element] = new Array();
                    content.forEach(cont => {
                        post[element].push(cont);
                    });
                }
            }
        }
        res.setHeader('Content-Type', 'application/json');
        if (!post) {
            res.status(404).send('');
            return
        }
        res.status(200).send(JSON.stringify({ post }, null, 4));
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
    }
});

router.put('/post/:postId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/post/:postId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/post/:postId/comments', async (req, res, next) => {
    try {
        const id = req.params.postId;
        let post = await contentRepo.getPostsComments(id);
        res.setHeader('Content-Type', 'application/json');
        if (!post) {
            res.status(404).send('');
            return
        }
        res.status(200).send(JSON.stringify({ comments: post }, null, 4));
    } catch (err) {
        res.status(500).send(err);
    }
});
//// END POST

//// COMMENT
router.get('/comments', async (req, res, next) => {
    try {
        const respuesta = validator.esUser(req.body);
        if (Object.keys(respuesta).length === 0 && respuesta.constructor === Object) {
            const resultado = await contentRepo.saveUser(req.body);
            if (!resultado) {
                res.status(404);
                return;
            }
            res.status(200).send(resultado);
        } else {
            res.status(400).send(respuesta);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/comments', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/comments/:commentId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/comments/:commentId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/comments/:commentId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});
//// END COMMENT

//// ALBUM
router.get('/albums', async (req, res, next) => {
    try {
        const respuesta = validator.esUser(req.body);
        if (Object.keys(respuesta).length === 0 && respuesta.constructor === Object) {
            const resultado = await contentRepo.saveUser(req.body);
            if (!resultado) {
                res.status(404);
                return;
            }
            res.status(200).send(resultado);
        } else {
            res.status(400).send(respuesta);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/albums', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/albums/:albumId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/albums/:albumId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/albums/:albumId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/albums/:albumId/photos', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});
//// END ALBUM

//// PHOTO
router.get('/photos', async (req, res, next) => {
    try {
        const respuesta = validator.esUser(req.body);
        if (Object.keys(respuesta).length === 0 && respuesta.constructor === Object) {
            const resultado = await contentRepo.saveUser(req.body);
            if (!resultado) {
                res.status(404);
                return;
            }
            res.status(200).send(resultado);
        } else {
            res.status(400).send(respuesta);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/photos', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/photos/:photoId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/photos/:photoId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/photos/:photoId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});
//// END PHOTO

//// TODO
router.get('/todos', async (req, res, next) => {
    try {
        const respuesta = validator.esUser(req.body);
        if (Object.keys(respuesta).length === 0 && respuesta.constructor === Object) {
            const resultado = await contentRepo.saveUser(req.body);
            if (!resultado) {
                res.status(404);
                return;
            }
            res.status(200).send(resultado);
        } else {
            res.status(400).send(respuesta);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/todos', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/todos/:todoId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/todos/:todoId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/todos/:todoId', async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send(err);
    }
});
//// END TODO
module.exports = router;