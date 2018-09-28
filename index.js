const app = require('express')();
const bodyParser = require('body-parser');
const contentRepo = require('./repositorio/content')

app.use(bodyParser.json());


app.get('/users/:userid', async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const user = await contentRepo.getUserDataById(id);

        if (!user) {
            console.log(user);
            return
        }
        console.log('F');
        //res.status(200).sendStatus(user);
    } catch (err) {
        console.log('E');
        //res.sendStatus(500).sendStatus(err);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        const user = await contentRepo.getUserData();
        if (!user) {
            console.log(user);
            // res.sendStatus(404).sendStatus();
            return
        }
        console.log('F');
        // res.sendStatus(200).sendStatus();
    } catch (err) {
        console.log('E');
        // res.sendStatus(500).sendStatus(err);
    }
});

app.get('/users/:userid/posts', async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const user = await contentRepo.getUserPost(id);
        if (!user) {
            res.status(404).sendStatus();
            return
        }
        res.status(200).sendStatus(user);
    } catch (err) {
        res.sendStatus(500).sendStatus(err);
    }
});

app.get('/users/:userid/albums', async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const user = await contentRepo.getUserAlbums(id);
        if (!user) {
            res.status(404).sendStatus();
            return
        }
        res.status(200).sendStatus(user);
    } catch (err) {
        res.sendStatus(500).sendStatus(err);
    }
});

app.delete('/users/:userid', async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const user = await contentRepo.deleteUserById(id);
        if (!user) {
            res.status(404).sendStatus();
            return
        }
        res.status(200).sendStatus(user);
    } catch (err) {
        res.sendStatus(500).sendStatus(err);
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
})