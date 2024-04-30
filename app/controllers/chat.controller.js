const pool = require('../config/db.pool.js');
const moment = require('moment-timezone');

exports.getAllMessage = async (req, res) => {    
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const response = await pool.query('SELECT * FROM message');

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil query semua message",
            data: response.rows,
        })
    }

    catch(err) {
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            message: "Gagal query semua message",
            log: err,
        })
    }
}

exports.getMessageById = async (req, res) => {
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const userQueryMessage = req.params.id;
        const response = await pool.query('SELECT message, time FROM message WHERE _from = $1', [userQueryMessage]);
 
        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil query message berdasarkan user",
            data: {
                sender: userQueryMessage,
                messages: response.rows,
            },
        })
    }

    catch(err){
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            message: "Gagal query message berdasarkan user",
            log: err,
        })
    }
}

exports.postMessage = async (req, res) => {
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const messageInsert = req.body.message;
        const senderInsert = req.body._from;
        
        await pool.query('INSERT INTO message (message, _from) VALUES ($1, $2)', [messageInsert, senderInsert]);

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil insert massage ke databse",
            log:{
                sender: senderInsert,
                message: messageInsert,
            },
        })
    }

    catch (err) {
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            message: "Gagal insert message ke database",
            log: err,
        })
    }
}