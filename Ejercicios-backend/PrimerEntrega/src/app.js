const express = require('express');
const app = express();
const PORT = 8080;
const productosRoutes = require("./routes/products.router.js");
const cartsRoutes = require("./routes/carts.router.js");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api", productosRoutes)
app.use("/api", cartsRoutes)


app.listen(PORT, () => console.log('En puerto 8080'))