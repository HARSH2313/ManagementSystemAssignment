const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
