require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const authMiddleware = require('./middlewares/authMiddleware');
const guestMiddleware = require('./middlewares/guestMiddleware');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const usersRouter = require('./routes/users');

const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/product'); 
const apiCategoriesRouter = require('./routes/api/categories');
const apiBrandRouter = require('./routes/api/brands');


const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const app = express();

app.use(session({
    secret: 'Pelotero',
     resave: false,
 saveUninitialized:false, 
}));
app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', usersRouter);

app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/categories', apiCategoriesRouter);
app.use('/api/brands', apiBrandRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});