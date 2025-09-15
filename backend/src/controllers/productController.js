const {getProducts, createProduct, getProductById} = require('../models/productModel');

async function listProducts(req, res){
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const products = await getProducts(limit, offset);
  res.json(products);
};

// async function createNewProduct(req, res){
//   const {name, description} = req.body;
//   const userId = req.user.id;   
//     if(!name || !description){
//         return res.status(400).json({message: "Name and description are required"});
//     }
//     try{
//         const newProduct = await createProduct(name, description, userId);
//         res.status(201).json({message: "Product created successfully", product: newProduct});
//     }catch(err){
//         console.error(err);
//         res.status(500).json({message: "Internal Server Error"});
//     }
// }

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


module.exports = { listProducts, detailProduct };