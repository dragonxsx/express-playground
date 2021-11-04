const express = require('express');

const router = express.Router();

const validated = (req, res, next) => {
    res.locals.validated = false;
    next();
}

router.use(validated);

router.get('/', (req, res, next) => {
    console.log('validated ', res.locals.validated);
    res.send('This is userRouter');
});

module.exports = router;
