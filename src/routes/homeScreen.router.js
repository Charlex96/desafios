
import express from "express";
import ProductManager from '../DAO/productManager.js';

const path = "./src/db/products.json";
const productManager = new ProductManager(path);
export const indexRouter = express.Router();

// Mostrar todos los productos
indexRouter.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();
    res.render("homeScreen", { products: allProducts });
});

export default indexRouter;




// import express from "express";
// import { ProductsModel } from "../DAO/models/products.model.js";
// import { ProductsService } from "../services/products.service.js";

// export const indexRouter = express.Router();

// const Service = new ProductsService();

// // Mostrar todos los productos
// indexRouter.get("/", async (req, res) => {

//     try {
//         const products = await Service.getAll();
//         return res.status(200).json({
//             status: "success",
//             msg: "listado de productos",
//             data: products,
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({
//             status: "error",
//             msg: "something went wrong :(",
//             data: {},
//         });
//     }
    


// });

// export default indexRouter;
