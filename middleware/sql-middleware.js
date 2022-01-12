const axios = require('axios');
const express = require('express');
const app = express();

var gameStartURL = 'http://34.204.158.189/dev/api/gameTime/?betKey='


function dbp() {
    const dbpool = require('mysql').createPool({
        connectionLimit: 10,
        acquireTimeout: 30000,
        waitForConnections: false,
        host: global.env.SQL_DB_HOST,
        port: global.env.SQL_DB_PORT,
        multipleStatements: true,
        user: global.env.SQL_DB_USER,
        password: global.env.SQL_DB_PASS,
        database: 'crm',
    })
    return dbpool
}

async function myDoQuery(sqlStr, valuesArr) {
    let dbpool = dbp()
    return await new Promise((resolve, reject) => {
        dbpool.getConnection((err, con) => {
            if (err) {
                console.log('error connecting server.');
                reject(err)
            } else {
                console.log("New DB connection was established with ID" + con.threadId);
                con.query(sqlStr, valuesArr, (errQuery, results) => {
                    con.release();
                    if (errQuery) {
                        console.log('Error queryng database!');
                        reject(errQuery)
                    } else {
                        console.log('Successfuly querid database.');
                        con.query(`KILL ${con.threadId}`)
                        resolve(results);
                    }
                });
            }
        });
    }
    )
}

module.exports = {
    //getAllUsers();
    async getAllUsers_get() {
        let sql = `SELECT * FROM users`;
        result = await myDoQuery(sql);
        return result
    },

    async eventAttributes_get(player) {
        let sql = `
        SELECT u.email, player_name, o.name as Operator FROM crm.bets as b

        INNER JOIN operators as o
        ON b.operator_id = o.id
        INNER JOIN user_bets as ub
        ON b.id = ub.bet_id
        INNER JOIN users as u
        ON ub.user_id = u.id
        
        WHERE lower(player_name) = "lebron james" 
        and o.name != "betmgm"
        and u.email NOT IN(
        SELECT e.user_email from events as e 
        where locate("Lebron James",e.data)>0) 
        ;
        `
        result = await myDoQuery(sql);
        return result
    },

    async gameStartDate_get() {
        let gameStartDate = await axios.get(gameStartURL)
            .then(result => {
                return result.data
            })
        return gameStartDate


    },
}

