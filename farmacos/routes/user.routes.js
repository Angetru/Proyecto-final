const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  findAll,
  findById,
  updateUser,
} = require("../controllers/user.controller");

//Endpoints para usuarios

router.get("/", auth, findAll);
router.get("/:id", auth, findById);
router.patch("/:id", auth, updateUser);

module.exports = router;
