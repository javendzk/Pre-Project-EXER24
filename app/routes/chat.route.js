const express = require("express");
const router = express.Router();
const {
  getAllMessage,
  getMessageById,
  postMessage,
} = require("../controllers/chat.controller.js");

router.get("/", getAllMessage);
router.get("/:id", getMessageById);
router.post("/", postMessage);

module.exports = router;  
