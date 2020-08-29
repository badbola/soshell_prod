const express = require("express");

const router = express.Router();
const usersApi = require("../../../controller/api/vi/users_api");

router.post("/create-session", usersApi.createSession);

module.exports = router;
