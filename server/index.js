const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Routers
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");


// Middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});


app.use('/api', userRoutes);
app.use('/api', menuRoutes);  


app.use('/api', orderRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
