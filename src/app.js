const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRouter);
app.use('/products', productRouter);


const port = 3010;
app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});