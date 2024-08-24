import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="product-card">
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock Quantity: {product.stock}</p>
            <p>Category: {product.category}</p>
            {onEdit && <button onClick={() => onEdit(product)}>Edit</button>}
            {onDelete && <button onClick={() => onDelete(product.id)}>Delete</button>}
        </div>
    );
};

export default ProductCard;
