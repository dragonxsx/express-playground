const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    res.send('<h1>Welcome to the home GET page!</h1>');
    next();
});

app.post('/', (req, res) => {
    res.send('<h1>Welcome to the home POST page!</h1>');
    next();
});

app.put('/', (req, res) => {

});

app.delete('/', (req, res) => {

});

app.all('/', (req, res, next) =>  {
    console.log('Catch all request here');
    next();
});

app.listen(3000, () => {
    console.info('The server is listening on port 3000');
})