const express = require("express");
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware.js');

const {
    getAllBooks,
    postBooks
} = require("../controllers/books.controller.js");

router.get('/get', getAllBooks);
router.post('/post', authenticateToken, postBooks);

module.exports = router;  
