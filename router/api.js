const express = require('express')
const router = express.Router();
const sql = require('./sql')


router.get('/', (req, res) => {
    //make a request to sql
    // respond to this request with sql
    res.json({
        message: "api works"
    });
})



router.use('/sql', sql)
module.exports = router