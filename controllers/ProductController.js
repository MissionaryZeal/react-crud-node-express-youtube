const handleMongoError = require("../errors/mongo-error");
const Product = require("../models/Product");

/** Return all products
 * @api GET /api/products
 * @returns JSON
 */
const allProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}


/** Create a product
 * @api POST /api/products
 * @returns JSON
 */
const createProduct = async (req, res, next) => {

    try {
        const product = await Product.create(req.body);
        res.status(200).json({ message: "Product Created Successfully", product });
    } catch (error) {
        console.log("Error " + error);
        next(handleMongoError(error));
    }

}

/** Show  product
 * @api GET /api/products/:id
 * @returns JSON
 */
const showProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Edit Product", product });
    } catch (error) {
        console.error("Error editing product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


/** Update  product
 * @api PUT /api/products/:id
 * @returns JSON
 */
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product Updated Successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        next(handleMongoError(error));
    }
}


/** Delete  product
 * @api PUT /api/products/:id
 * @returns JSON
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product Deleted Successfully", product });
    } catch (error) {
        console.error("Error delete product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    allProducts,
    createProduct,
    showProduct,
    updateProduct,
    deleteProduct
}