const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const usersRouter = require('./routes/users');
const authMiddleware = require('./middlewares/authMiddleware');
const guestMiddleware = require('./middlewares/guestMiddleware');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const app = express();

app.use(session({
    secret: 'Pelotero',
     resave: false,
 saveUninitialized:false, 
}));
app.use(userLoggedMiddleware);
app.use(cookies());

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


const port = 3010;
app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});