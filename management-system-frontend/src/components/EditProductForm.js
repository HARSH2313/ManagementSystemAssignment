import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProductForm = ({ product, onUpdate, onCancel }) => {
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });

    useEffect(() => {
        if (product) {
            setProductDetails({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                stock: product.stock
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${product.id}`, productDetails);
            onUpdate();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-form">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={productDetails.name}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={productDetails.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={productDetails.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={productDetails.category}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock Level"
                    value={productDetails.stock}
                    onChange={handleChange}
                />
                <button type="submit">Update Product</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProductForm;
