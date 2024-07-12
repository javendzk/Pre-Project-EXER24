const pool = require('../config/db.pool.js');
const moment = require('moment-timezone');

exports.getAllBooks = async (req, res) => {
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const response = await pool.query('SELECT * FROM books_list');

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            data: response.rows,
        })
    }

    catch (Error) {
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            log: Error,
        })
    }
}

exports.postBooks = async (req, res) => {
    const timestamp = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm [WIB]');

    try {
        const titleInsert = req.body.title;
        const authorInsert = req.body.author;
        const ISBNInsert = req.body.isbn;

        await pool.query('INSERT INTO books_list (title, author, isbn) VALUES ($1, $2, $3)', [titleInsert, authorInsert, ISBNInsert]);

        res.status(200).json({
            success: true,
            timestamp: timestamp,
            message: "Berhasil menambahkan buku",
            data: {
                book: titleInsert,
                author: authorInsert,
                ISBN: ISBNInsert,
            },
        })
    }

    catch (Error) {
        res.status(500).json({
            success: false,
            timestamp: timestamp,
            log: Error,
        });
    }
}
