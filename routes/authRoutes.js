// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;


const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const authRouter = express.Router();


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;
