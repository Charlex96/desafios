import express from "express";
import ProductManager from '../productManager.js';

const path = "./src/db/products.json";
const productManager = new ProductManager(path);
export const indexRouter = express.Router();

// Mostrar todos los productos
indexRouter.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();
    res.render("homeScreen", { products: allProducts });
});

export default indexRouter;
