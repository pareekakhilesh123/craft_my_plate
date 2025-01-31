const express = require('express')
const cors = require('cors');

require('dotenv').config()


const app = express()

// Routers
const userRoutes = require("./routes/userRoutes")

// Middleware
app.use(express.json());
app.use(cors());

const port =process.env.PORT

app.get('/health', (req, res) => {
  res.status(200)
})

app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})