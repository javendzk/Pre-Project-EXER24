const express = require ('express');
const mongoose = require ('mongoose');
require('dotenv').config()

const dbConnection = require('./app/config/db.config.js');
const corsConfigs = require('./app/config/cors.config.js');
const accountRouter = require('./app/routes/account.routes.js');
const voteRouter = require('./app/routes/vote.routes.js');


// server & db configs
const app = express();
const PORT = process.env.PORT || 5000;
dbConnection();


// middleware configs
app.use(cors(corsConfigs));
app.use(express.json());


// routings
app.use('/vote', voteRouter);
app.use('/account', accountRouter);


app.listen(PORT, () => {
    console.log(`[v] Server aktif di port: ${PORT}`);
});
