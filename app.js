// 052-8585479 shalev
//058-6000721 michel

const express = require('express')
const app = express();
let secureEnv = require('secure-env');
global.env = secureEnv({ secret: 'sidelines' });

require('dotenv').config();

const apiAuth = require('./middleware/apiAuthentication')
const api = require('./router/api');

app.use(express.static('public'));

app.use('/api', apiAuth.auth, api);

//===============================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listeninig on port ${port}`);
})