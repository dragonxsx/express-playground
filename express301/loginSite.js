const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({contentSecurityPolicy: false}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.get('/login', (req, res) => {
    res.render('login', {
        msg: ''
    });
});

app.post('/process_login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check the database
    if(password === 'X') {
        res.cookie('username', username);
        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=fail');
    }
});

app.get('/welcome', (req, res) => {
    const username = req.cookies['username'];

    res.render('welcome', {
        username
    });
})

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
