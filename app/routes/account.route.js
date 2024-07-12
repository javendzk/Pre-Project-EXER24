const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  postUser,
  authUser
} = require("../controllers/account.controller.js");

router.get("/", getAllUser);
router.post("/", postUser);
router.get("/login", authUser);
router.get("/:id", getUserById);

module.exports = router;
