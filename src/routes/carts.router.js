
import express from 'express';
// import CartManager from '../DAO/cartManager.js';
import { CartsService } from '../services/carts.service.js';
import { CartsModel } from '../DAO/models/carts.model.js';

// const path = "./src/db/carts.json";
// const myCartsManager = new CartManager(path);
export const cartsRouter = express.Router();

const Service = new CartsService();

cartsRouter.post("/", async (req, res) => {
  /**Crea un carrito vacío de productos */
    try {
        // const newCart = req.body;
        // const cartCreated = await myCartsManager.addCart(newCart);
        const cartCreated = await Service.createOne();
        cartCreated
        ? res.status(201).json({
            status: "success",
            payload: cartCreated,
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

cartsRouter.get("/", async (req, res) => {
  /**Devuelve todos los carritos */
    try {
        const allCarts = await CartsModel.find();
        res.status(200).json({
        status: "success",
        payload: allCarts,
        });
    } catch (err) {
        res.status(500).json({
        status: "error",
        payload: err.message,
        });
    }
});

cartsRouter.get("/:idCart/products", async (req, res) => {
  /**Devuelve los productos de un carrito por id */
    try {
        const idCart = req.params.idCart;
        const cart = await service.get(idCart);
        res.status(200).json({
        status: "success",
        payload: cart.products,
        });
    } catch (err) {
        res.status(404).json({
        status: "error",
        message: "Sorry, no cart found by id: " + req.params.idCart,
        payload: {},
        });
    }
});

cartsRouter.put("/:idCart/products/:idProduct", async (req, res) => {
  /**Agrega un producto al carrito */
    try {
        const idCart = req.params.idCart;
        const idProduct = req.params.idProduct;
        const cart = await service.get(idCart);
        cart.products.push(idProduct);
        await cart.save();
        res.status(200).json({
        status: "success",
        payload: cart,
        });
    } catch (err) {
        res.status(404).json({
        status: "error",
        message: "Sorry, could not add product to cart",
        payload: {},
        });
    }
});

export default cartsRouter;

