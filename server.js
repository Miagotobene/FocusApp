require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const cors = require('cors');
const MongoStore = require('connect-mongo');


const session = require('express-session');
const passport = require('passport');
const { isLoggedIn } = require('./middleware/isLoggedIn');
const Book = require('./models/books')

const app = express();
const port = 4000 || process.env.PORT;

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

// create the user model

// initialize passport 
app.use(passport.initialize())
app.use(passport.session())


// add middleware
app.use(express.urlencoded({exended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());

// connect to the database
connectDB()

// serve static files 
app.use(express.static('public'));

// set templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs')

// serve the main route here
app.use('/', require('./routes/home')) 

// serve the route for the todoApp dashboard
app.use('/', require('./routes/todo-dashboard')) 
 
// serve the authentification route
app.use('/', require('./routes/auth')) 

// Route for timer app
app.get('/timer', isLoggedIn, (req,res) => { // isloggedkin note working
    res.render('timer')
})

// isLoggedIn,
// // Route for book list app
app.use('/api/books', require('./routes/book-list'))  // isloggedkin note working

// serve the 404 page route
app.get('*', (req,res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`App's listening on port: ${port}`)
})