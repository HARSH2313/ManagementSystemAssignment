import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

const UserPanel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <h1>User</h1>
            <ProductList products={products} />
        </div>
    );
};

export default UserPanel;
