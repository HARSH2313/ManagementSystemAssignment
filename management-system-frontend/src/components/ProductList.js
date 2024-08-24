import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProductList;
