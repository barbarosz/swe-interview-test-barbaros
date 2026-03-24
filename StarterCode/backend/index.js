const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// sample product data for the card list
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

// generate a random image url for each product
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

// get all products
app.get('/api/products', (req, res) => {
    const productsWithImages = products.map((product) => ({
        ...product,
        imageUrl: product.imageUrl || fetchImageUrl(),
    }));

    products = productsWithImages;
    return res.status(200).json(productsWithImages);
});

// delete a product by id
app.delete('/api/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const productExists = products.some((product) => product.id === productId);

    if (!productExists) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products = products.filter((product) => product.id !== productId);

    return res.status(200).json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});