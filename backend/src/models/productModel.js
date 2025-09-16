const pool = require('../db/config');

// All products with pagination
async function getProducts(limit, offset) {
  const result = await pool.query(
    `SELECT * FROM products 
     ORDER BY id DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
}

// Create product
async function createProduct(name, description, imageUrl, userId) {
  const result = await pool.query(
    `INSERT INTO products (name, description, image_url, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, description, imageUrl, userId]
  );
  return result.rows[0];
}

// Detail product by ID
async function getProductById(id) {
  const result = await pool.query(
    `SELECT * FROM products WHERE id=$1`,
    [id]
  );
  return result.rows[0];
}

// Edit produk
async function editProduct(id, name, description) {
  const result = await pool.query(
    `UPDATE products 
     SET name=$1, description=$2
     WHERE id=$3 
     RETURNING *`,
    [name, description, id]
  );
  return result.rows[0];
}

// delete product
async function deleteProduct(id) {
  const result = await pool.query(
    `DELETE FROM products WHERE id=$1`,
    [id]
  );
  return result.rowCount > 0; 
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
};
