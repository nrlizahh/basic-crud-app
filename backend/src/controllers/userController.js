// controllers/userController.js
const bcrypt = require("../helpers/bcrypt"); // helper untuk hash password
const { signToken } = require("../helpers/jwt"); // helper untuk generate token
const { register, findUserByUsername } = require("../models/userModel"); // model

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
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // cek user sudah ada atau belum
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash password
    const hashPassword = bcrypt.hashPassword(password);

    // simpan user ke database
    const newUser = await register(username, hashPassword);
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//LOGIN USER
async function loginUser(req, res) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "invalid username/password" });
    }

    const match = bcrypt.comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "invalid username/password" });
    }

    // buat token pakai helper jwt
    const token = signToken({ id: user.id });

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerUser, loginUser };
