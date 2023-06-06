import express from 'express';
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import realtimeproductsRouter from './routes/realTimeProduct.router.js';
import homeScreenRouter from './routes/homeScreen.router.js';
import {testSocketChatRouter} from "./routes/test.socket.chat.router.js";

//----------------__DIRNAME------------------------------
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import ProductManager from './DAO/productManager.js';
import { connectMongo } from './utils/connectDB.js';

const app = express();
const PORT = 8080 || process.env.PORT;

const pathProduct = "./src/db/products.json";
const productManager = new ProductManager(pathProduct);
// const productManager = new ProductManager();

const httpServer = app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT} at ${new Date().toLocaleDateString()}`);
});


connectMongo();

const socketServer = new Server(httpServer);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/public", express.static(__dirname + "/public"));

// Para el uso de web-socket y handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', homeScreenRouter);
app.use('/realtimeproducts', realtimeproductsRouter);

//Rutas: SOCKETS
app.use("/test-chat", testSocketChatRouter);

// HANDLERS SOCKET
socketServer.on("connection", (socket) => {
    console.log(`New Client Connection with ID: ${socket.id}`);

    //ACA RECIBO LOS DATOS DEL FRONT
    socket.on("createProduct", async (newProd) => {
        try {
            await productManager.addProduct({ ...newProd });
    
        // Actualizando lista despues de agregar producto nuevo
            const productsList = await productManager.getProducts();
            socketServer.emit("productsList", { productsList });
        } catch (error) {
            console.log(error);
        }
    
    });

    // eliminacion de un Product
    socket.on("deleteProduct", (id) => {
        productManager.deleteProduct(id);
        socket.emit("productsList", productManager.getProducts());
    });
});

app.get('*', (req, res) =>{
    res.status(404).json({
        status: 'error',
        msg: 'no esta implementada la ruta!!',
        productManager: {},
    });
});


