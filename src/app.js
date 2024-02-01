require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');

const authMiddleware = require('./middlewares/authMiddleware');
const guestMiddleware = require('./middlewares/guestMiddleware');


const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const brandsRouter = require('./routes/brands');

const apiDatabaseRouter = require('./routes/api/database');
const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/product'); 
const apiCategoriesRouter = require('./routes/api/categories');
const apiBrandRouter = require('./routes/api/brands');


const errorMiddleware = require('./middlewares/errorMiddleware');
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

// allow access to dashboard app 
app.use(cors({
    origin: "http://localhost:5173"
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);


app.use('/api/database', apiDatabaseRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/categories', apiCategoriesRouter);
app.use('/api/brands', apiBrandRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});