import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from '../components/AddProductForm';
import ProductList from '../components/ProductList';
import EditProductForm from '../components/EditProductForm';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddProduct = () => {
        fetchProducts();
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = () => {
        fetchProducts();
        setEditingProduct(null);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:5000/api/users', newUser);
            setNewUser({ username: '', password: '', role: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h1>Admin</h1>
            <AddProductForm onProductAdded={handleAddProduct} />
            <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />
            {editingProduct && (
                <EditProductForm
                    product={editingProduct}
                    onUpdate={handleUpdateProduct}
                    onCancel={handleCancelEdit}
                />
            )}
            <h2>Add User</h2>
            <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="stock_manager">Stock Manager</option>
            </select>
            <button onClick={handleAddUser}>Add User</button>
            <h3>Existing Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.role})
                        <button onClick={() => handleDeleteUser(user.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
