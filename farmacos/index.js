const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const connectDB = require("./config/db");

const app = express();
require("dotenv").config();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const routes = require('./routes');
app.use(process.env.URL_BASE + "/", routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();
app.listen(process.env.PORT || 3000, () => {
    console.log(`listen in port ${process.env.PORT}`);
});