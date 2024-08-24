import React from 'react';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import StockManagerPanel from './components/StockManagerPanel';

function App() {
  // Assume that you have some way of determining user roles here
  //  const userRole = 'admin'; // This should be dynamically determined
  const userRole = 'stock_manager';
  // const userRole = 'user';
  return (
    <div className="App">
      <h1>Management System</h1>
      {userRole === 'admin' && <AdminPanel />}
      {userRole === 'stock_manager' && <StockManagerPanel />}
      {userRole === 'user' && <UserPanel />}
    </div>
  );
}

export default App;
