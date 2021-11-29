const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index.html');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});