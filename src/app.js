const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', mainRouter);
app.use('/products', productRouter);
//ruta para trabajar el formulario de creacion de producto
app.get('/createProduct', (req,res) => {
    res.render('products/createProduct');
});

const port = 3010;
app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});