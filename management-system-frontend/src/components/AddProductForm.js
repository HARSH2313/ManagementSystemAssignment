import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', product);
            onProductAdded();
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                stock: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Product</h3>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Product Description"
                value={product.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Product Price"
                value={product.price}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                value={product.stock}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
