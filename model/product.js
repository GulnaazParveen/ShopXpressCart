import mongoose, { mongo } from 'mongoose';

// Define schema for the Product collection
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

// Create a model for the Product collection using the schema
const product = mongoose.model('product', productSchema);
const anotherproducts = mongoose.model('anotherproducts', productSchema);


// product.js
export { product, anotherproducts };
