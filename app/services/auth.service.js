const jwt = require('jsonwebtoken');
const pool = require('../config/db.pool.js');
const bcrypt = require('bcrypt');

const auth = async (body) => {
    try {
        const {username, password} = body;
        if (!username || !password) throw new Error('[!] Password / Username harus diisi');

        const response = await pool.query('SELECT * FROM users_list WHERE username = $1', [username]);
        if (response.rows.length === 0) throw new Error('[!] Username tidak valid');

        const isPasswordValid = await bcrypt.compare(password, response.rows[0].password);
        if (!isPasswordValid) throw new Error('[!] Password tidak valid');

        const token = jwt.sign({id: response.rows[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return {
            success: true,
            message: '[!] Berhasil login',
            token: token,
            username: response.rows[0].username,
        }

    }

    catch (Error) {
        return {
            success: false,
            message: Error.message,
        }
    }
}

module.exports = auth;

// javen sukamakan123
// lero kabidsoft567