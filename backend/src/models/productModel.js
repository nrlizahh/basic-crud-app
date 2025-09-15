const pool = require('../db/config');

//get all products
async function getProducts(limit, offset) {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY id DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
}

//create product
async function createProduct(name, description, userId) {
  const result = await pool.query(
    'INSERT INTO products(name,description,created_by) VALUES($1,$2,$3) RETURNING *',
    [name, description, userId]
  );
  return result.rows[0];
}

//detail product
async function getProductById(id) {
  const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
  return result.rows[0];
}

//edit product
async function editProduct(id, name, description) {
  const result = await pool.query(
    'UPDATE products SET name=$1, description=$2 WHERE id=$3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0];
}

//delete product
async function deleteProduct(id) {
  const result = await pool.query('DELETE FROM products WHERE id=$1', [id]);
  return result.rowCount > 0;
}

module.exports = {getProducts, createProduct, getProductById, editProduct, deleteProduct};