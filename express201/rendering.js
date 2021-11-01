const path = require('path');
const express = require('express');
const helmet = require('helmet');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, () =>  {
    console.log('Listening on port 3000');
})