
import express from 'express';
import { ProductsModel } from '../DAO/models/products.model.js';
import { ProductsService } from '../services/products.service.js';
import ProductManager from './../DAO/productManager.js';
import validationFunctions from './../middleware/validators.js';
import validateNumber from './../utils/helpers.js';

const path = "./src/db/products.json";
const productManager = new ProductManager(path);
export const productsRouter = express.Router();

// Para acceder a las funciones individuales, se debe hacer lo siguiente:
const { validateRequest, validateNumberParams, validateCodeNotRepeated } = validationFunctions;

const Service = new ProductsService();


productsRouter.get('/', async (req, res) =>{
    

    try {
        
        const limit = req.query.limit;
        // const products = await productManager.getProducts();
        const products = await Service.getAll();
        console.log({products});
        const isValidLimit = validateNumber(limit);

        products
        ? isValidLimit
            ? res.status(200).json({
                status: "success",
                payload: products.slice(0, limit),
            })
            : res.status(200).json({
                status: "success",
                payload: products,
            })
        : res.status(200).json({ status: "success", payload: [] });
    } catch (err) {
        res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
        });
    }

});

productsRouter.get('/:id', validateNumberParams, async (req, res)=>{

    try {

        const id = req.params.id;
        const product = await productManager.getProductsById(id);

        product
        ? res.status(200).json({
            status: "success",
            payload: product,
            })
        : res.status(404).json({
            status: "error",
            message: "Sorry, no product found by id: " + id,
            payload: {},
            });
    } catch (err) {
        res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
        });
    }

});

productsRouter.post("/", validateRequest, validateCodeNotRepeated, async (req, res) => {
    try {
        const newProduct = req.body;
        const productCreated = await productManager.addProduct(newProduct);
        productCreated
        ? res.status(201).json({
            status: "success",
            payload: productCreated,
            })
        : res.json({
            status: "error",
            });
    } catch (err) {
        res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
        });
    }
});

productsRouter.put("/:id", validateRequest, validateNumberParams, async (req, res) => {
    try {
        const id = req.params.id;
        const newProduct = req.body;
        const productUpdated = await productManager.updateProduct(id, newProduct);
        res.status(200).json({
        status: "success",
        payload: productUpdated,
        });
    } catch (err) {
        res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
        });
    }
});

productsRouter.delete("/:id", validateNumberParams, async (req, res) => {
    try {
        console.log("delete");
        const id = req.params.id;
        const product = await productManager.getProductById(id);
        if (!product) {
        res.status(404).json({
            status: "error",
            message: "Sorry, no product found by id: " + id,
            payload: {},
        });
        return;
        }
        const productDeleted = await productManager.deleteProduct(id);
        res.status(200).json({
        status: "success",
        payload: productDeleted,
        });
    } catch (err) {
        res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
        });
    }
});

export default productsRouter;


