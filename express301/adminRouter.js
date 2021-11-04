const express = require('express');

const router = express.Router();

router.get('/info', (req, res, next) =>  {
    res.json({msg: 'Loading data'});
});

module.exports = router;