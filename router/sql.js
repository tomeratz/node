const express = require('express')
const router = express.Router();
const sqlMid = require('../middleware/sql-middleware')

router.get('/', (req, res) => {
    //make a request to sql
    // respond to this request with sql
    res.json({
        message: "sql works"
    });
})

router.get('/users', async (req, res, next) => {
    //make a request to sql
    try {
        const data = await sqlMid.getAllUsers_get()
        console.table(data);
        res.send(data)
    }
    catch (err) {
        next(err)
        res.send(err)
    }
})

router.get('/eventatt', async (req, res, next) => {
    //make a request to sql
    let player = 'Labron James'
    try {
        const data = await sqlMid.eventAttributes_get(player)
        console.table(data);

        let gameStartDate = await sqlMid.gameStartDate_get(player)
        console.log(gameStartDate);
        data.push(gameStartDate)

        const operatorPromoText = { PromoText: 'A $20 free bet promotion on Bet MGM operator' }
        data.push(operatorPromoText)
        res.send(data,)

    }
    catch (err) {
        next(err)
        res.send(err)
    }
})


module.exports = router