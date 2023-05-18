import express from "express";
import ProductManager from '../productManager.js';

const path = "./src/db/products.json";
const productManager = new ProductManager(path);
export const realtimeproductsRouter = express.Router();

// Mostrar todos los productos con websockets
realtimeproductsRouter.get("/", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("realTimeProducts", { products: allProducts });
});

export default realtimeproductsRouter;