const app = require('express')();
const bodyParser = require('body-parser');
const contentRepo = require('./repositorio/content')

app.use(bodyParser.json());

app.get('/users/:userid', async (req, res, next) => {
    try {
        const id = req.params.userid;
        let users = await contentRepo.getUsersById(id);
        let addresses = await contentRepo.getAddressesById(id);
        let companies = await contentRepo.getCompaniesById(id);
        
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
            res.send(400);
            return
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ users }));
        res.send(200);
    } catch (err) {
        res.send(500);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        let users = await contentRepo.getUsers();
        const addresses = await contentRepo.getAddresses();
        const companies = await contentRepo.getCompanies();
        users.forEach(user => {
            const addressOfUser = addresses.find(a => 
                a.userid === user.id);
            user.address = new Array();
            addressOfUser.forEach(address => {
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
            const companyOfUser = companies.find(c =>
                c.userid === user.id);
            users.company = new Array();
            companyOfUser.forEach(company => {
                users.company.push(company);
            });
        });
        if (!users) {
            res.send(404);
            return
        }
        res.send(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ users }));
    } catch (err) {
        res.send(500);
    }
});

app.get('/users/:userid/posts', async (req, res, next) => {
    try {
        const id = req.params.userid;
        const post = await contentRepo.getUserPost(id);
        if (!post) {
            res.status(404);
            res.send('not found')
            return
        }
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ post }));
    } catch (err) {
        res.sendStatus(500).sendStatus(err);
    }
});

app.get('/users/:userid/albums', async (req, res, next) => {
    try {
        const id = req.params.userid;
        const albums = await contentRepo.getUserAlbums(id);
        if (!albums) {
            res.status(404);
            res.send('not found')
            return
        }
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ albums }));
    } catch (err) {
        res.sendStatus(500).sendStatus(err);
    }
});

app.get('/users/:userid/todos', async (req, res, next) => {
    try {
        const id = req.params.userid;
        let todos = await contentRepo.getUserTodos(id);  
        if (!todos) {
            res.status(404);
            res.send('not found')
            return
        }
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ todos }));
    } catch (err) {
        res.sendStatus(500).sendStatus(err);
    }
});

app.delete('/users/:userid', async (req, res, next) => {
    try {
        const id = req.params.userid;
        const user = await contentRepo.deleteUserById(id);
        if (!user) {
            res.send(404);
            return
        }
        res.send(200);
    } catch (err) {
        res.send(500);
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
})