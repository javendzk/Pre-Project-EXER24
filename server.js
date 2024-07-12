const express = require ('express');
const cors = require ('cors');
require('dotenv').config()

const corsConfigs = require('./app/config/cors.config.js');
const accountRouter = require('./app/routes/account.route.js');
const chatRouter = require('./app/routes/chat.route.js');
const booksRouter = require('./app/routes/books.route.js');

// server & db configs
const app = express();
const PORT = process.env.PORT || 5000;

// middleware configs
app.use(cors(corsConfigs));
app.use(express.json());

// routers
app.use('/message', chatRouter);
app.use('/user', accountRouter);
app.use('/book', booksRouter);


app.listen(PORT, () => {
    console.log(`[v] Server aktif di port: ${PORT}`);
});
