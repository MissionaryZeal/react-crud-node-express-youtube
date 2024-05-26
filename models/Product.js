const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: [true, "Product name must be unique"],
        minlength: [3, "Product name at least 3 character"],
        maxlength: [30, "Product name cannot be more than 30 character"],
        trim: true,
    },
    slug: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
