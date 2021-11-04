const express = require('express');
const helmet = require('helmet');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res, next) => {
    res.send('<h1>Homepage</h1>');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})