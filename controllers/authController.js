// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Generate JWT Token including isAdmin
// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       username: user.username,
//       isAdmin: user.isAdmin, 
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   );
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// exports.registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({ username, email, password });
//     const token = generateToken(user); 

//     res.status(201).json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     console.dir(user, {depth: null})
//     const token = generateToken(user); 

//     res.json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token including isAdmin
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin, 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user); 

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user); 

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = req.body.username || user.username;
    await user.save();

    res.json({
      message: 'Profile updated',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User account deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // Optional — if you're using cookies
  res.json({ message: 'Logged out successfully' });
};
