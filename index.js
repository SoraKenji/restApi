const app = require('express')();
const bodyParser = require('body-parser');
const rutas = require('./rutas/index');

app.use(bodyParser.json());

app.use(rutas);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})