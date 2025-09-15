const { verifyToken } = require("../helpers/jwt");
const { findUserById } = require("../models/userModel");

const authentication = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];

    console.log(' Headers:', req.headers); // cek semua header
  console.log(' Authorization:', req.headers.authorization); 
  if (!bearerToken) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  // Format: "Bearer token"
  const [, token] = bearerToken.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  try {
    const data = verifyToken(token);

    // Cari user berdasarkan id dari token
    const user = await findUserById(data.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user; // Simpan data user ke req.user
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authentication;
