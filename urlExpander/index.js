const express = require('express');
const helmet = require('helmet');
const fetch = require('node-fetch');

const app = express();

app.use(helmet());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/expand', async (req, res) => {
    let shortUrl = req.query.shortUrl;

    if(!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl;
    try {
        const response = await fetch(shortUrl, {
            method: 'HEAD'
        });
        res.send(response.url);
    } catch (e) {
        res.status(400).send('Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});