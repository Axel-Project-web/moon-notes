const express = require("express");

//controllers
const { loginController } = require("../controller/login.controller");
const { singupController } = require("../controller/singup.controller");
const { updateController } = require("../controller/update.controller");

//middleware
const { loginMiddleware } = require("../middleware/login.middleware");
const { singupMiddleware } = require("../middleware/singup.middleware");
const { updateMiddleware } = require("../middleware/update.middleware");

const router = express.Router();

router.post("/login", loginMiddleware, loginController);
router.post("/register", singupMiddleware, singupController);
router.post("/update", updateMiddleware, updateController);

module.exports = router;
