import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import EditProductForm from '../components/EditProductForm';

const StockManagerPanel = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleUpdateProduct = () => {
        fetchProducts(); // Refresh the product list after updating
        setSelectedProduct(null);
    };

    const handleCancelEdit = () => {
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1>Stock Manager</h1>
            <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />
            {selectedProduct && (
                <EditProductForm
                    product={selectedProduct}
                    onUpdate={handleUpdateProduct}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default StockManagerPanel;
