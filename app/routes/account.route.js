const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  postUser,
} = require("../controllers/account.controller.js");

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", postUser);

module.exports = router;
