const express = require('express');
const helmet = require('helmet');
const request = require('request');

const app = express();

app.use(helmet());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/expand', (req, res) => {
    let shortUrl = req.query.shortUrl;

    if(!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl;
    request({
        url: shortUrl,
        method: 'HEAD',
        followAllRedirects: true
    }, (err, response, body) => {
        if(err) { 
            return res.status(400).send('Error');
        }
        
        res.send(response.request.href);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});