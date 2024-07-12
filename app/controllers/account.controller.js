const pool = require('../config/db.pool.js');
const moment = require('moment-timezone');
const auth = require('../services/auth.service.js');

exports.getAllUser = async (req, res) => {    
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');
    
    try {
        const response = await pool.query('SELECT * FROM users');

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil query semua user",
            data: response.rows,
        })
    }

    catch(err) {
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            message: "Gagal query semua user",
            log: err,
        })
    }
}

exports.getUserById = async (req, res) => {
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const userQueryId = req.params.id;
        const response = await pool.query('SELECT * FROM users WHERE npm = $1', [userQueryId]);

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil query user berdasarkan id",
            data: response.rows,
        })
    }

    catch(err){
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            message: "Gagal query user berdasarkan id",
            log: err,
        })
    }
}

exports.postUser = async (req, res) => {
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const npmInsert = req.body.npm;
        const namaInsert = req.body.display_name;
        const passwordInsert = req.body.password;

        await pool.query('INSERT INTO users (npm, display_name, password) VALUES ($1, $2, $3)', [npmInsert, namaInsert, passwordInsert]);

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil insert user ke databse",
            log:{
                npm: npmInsert,
                nama: namaInsert,
            },
        })
    }

    catch (err) {
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            message: "Gagal insert user ke database",
            log: err,
        })
    }
}

exports.authUser = async (req, res) => {
    try {
        const result = await auth(req.body);

        if(result.success) res.status(200).json(result);
        else res.status(401).json(result);
    }

    catch(Error){
        res.status(500).json({
            success: false,
            message: Error.message,
        })
    }

}