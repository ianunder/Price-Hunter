const express = require('express');
require("dotenv").config();
const searchItemRoutes = require('./routes/searchItemRoutes');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use('/api/searchItem', searchItemRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});