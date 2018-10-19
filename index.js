const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const rutas = require('./rutas/index');

app.use('/', rutas);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})