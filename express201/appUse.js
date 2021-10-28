const express = require('express');

const app = express();

const validateUser = (req, res, next) => {
    res.locals.validated = true;
    console.log('VALIDATED RAN!');
    next();
}

// app.use('/', validateUser);
app.use(validateUser);
app.use('/admin', validateUser);


app.get('/', (req, res) => {
    res.send('<h1>This is main page</h1>');
    console.log(res.locals.validated);
})

app.get('/admin', (req, res) => {
    res.send('<h1>This is admin page</h1>');
})


app.listen(3000, () => {
    console.log('The server is listening on port 3000');
}); 