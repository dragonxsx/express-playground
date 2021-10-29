const express = require('express');
const helmet = require('helmet');

const app = express();
// TODO: Deal with Content-Security-Policy later
// app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/ajax', (req, res) => {
    console.log('Request body', req.body);
    console.log('Request header', req.headers);
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.send('DONE');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});