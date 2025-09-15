const {
  getProducts,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
} = require("../models/productModel");

//see all product
async function listProducts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const products = await getProducts(limit, offset);
  res.json(products);
}

//create new product
async function createNewProduct(req, res) {
  const { name, description } = req.body;
  const userId = req.user.id;
  console.log("User ID from token:", userId); // cek userId dari token
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  try {
    const newProduct = await createProduct(name, description, userId);
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//detail product by id
async function detailProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//edit product by id
async function updatedProduct(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await editProduct(id, name, description);
    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//delete product by id
async function deleteProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  listProducts,
  detailProduct,
  createNewProduct,
  updatedProduct,
  deleteProductById,
};
