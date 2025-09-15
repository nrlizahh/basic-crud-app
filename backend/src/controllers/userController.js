// controllers/userController.js
const bcrypt = require('../helpers/bcrypt');           // helper untuk hash password
const { register, findUserByUsername } = require('../models/userModel'); // model

// REGISTER USER
async function registerUser(req, res) {
  try {
    // log buat cek isi request
    // console.log('Headers:', req.headers);
    // console.log('Body:', req.body);

    // ambil data dari body
    const { username, password } = req.body || {};

    // validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // cek user sudah ada atau belum
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // hash password
    const hashPassword = bcrypt.hashPassword(password); 

    // simpan user ke database
    const newUser = await register(username, hashPassword);
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (err) {
    console.error('Register Error:', err); 
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { registerUser };
