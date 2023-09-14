const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3010;

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/product', (req, res) => {
    res.sendFile(__dirname + '/views/product.html');
});
app.get('/cart', (req, res) => {
    res.sendFile(__dirname + '/views/cart.html');
});
app.post('/register', (req, res) => {
    res.redirect('/');
});
app.post('/login', (req, res) => {
    res.redirect('/');
});
app.get('*', (req, res) => {
    res.status(404).send('Página no encontrada');
});


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});