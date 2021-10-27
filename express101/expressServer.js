const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
})

app.all('*', (req, res) => {
    res.send('<h1>Page not found</h1>');
})

app.listen(3000, () => {
    console.log('The server is listening on port 3000');
});