const router = require('express').Router();
const contentRepo = require('../repositorio/content')

router.get('/users/:userid', async (req, res, next) => {
    try {
        const id = req.params.userid;
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
        console.log(addresses);
        users.forEach(user => {
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
        });
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
        if (!albums) {
            res.status(404).send('not found')
            return
        }
        res.status(200).send(JSON.stringify({ albums }));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users/:userid/todos', async (req, res, next) => {
    try {
        const id = req.params.userid;
        let todos = await contentRepo.getUserTodos(id);  
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
        console.log(resultado.rowCount);
        if (!resultado) {
            res.status(404);
            return;
        }
        res.status(200).send(`La consulta ha eliminado ${resultado.rowCount} registro/s`);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/users', async (req, res, next) => {
    try {
        
    } catch (err) {

    }
});

module.exports = router;