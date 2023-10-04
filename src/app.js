const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3010;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/register', (req, res) => {
    res.render('users/register');
});
app.get('/login', (req, res) => {
    res.render('users/login');
});
app.get('/product', (req, res) => {
    res.render('products/product');
});
app.get('/cart', (req, res) => {
    res.render('products/cart');
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
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});