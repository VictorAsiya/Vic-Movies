const router = require("express").Router
const { getAllUsers } = require("../controllers/adminController");
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const usersRouter = router()

usersRouter.get('/', verifyToken, verifyAdmin, getAllUsers);

module.exports = usersRouter