import express from "express";
import morgan from "morgan";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { Server as SocketServer } from "socket.io";
import http from "http";
import homeFsRoutes from "./routes/fs/homeFsRoutes.js";
import productFsRoutes from "./routes/fs/productFsRoutes.js";
import cartFsRoutes from "./routes/fs/cartFsRoutes.js";
import homeRoutes from "./routes/mongo/homeRoutes.js";
import productRoutes from "./routes/mongo/productRoutes.js";
import cartRoutes from "./routes/mongo/cartRoutes.js";
import chatRoutes from "./routes/mongo/chatRoutes.js";
import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { connectMongoDB } from "./config/configMongoDB.js";
import { authRouter } from './routes/mongo/auth.router.js';
import { iniPassport } from './config/passport.config.js';
import passport from 'passport';



/** --------------- variables --------------- */

const app = express();
const PORT = 8080 || process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

/** --------------- server httt & websocket --------------- */

/** Tenemos dos servidores:  httpServer (http) y io (websocket)*/
const httpServer = http.createServer(app);

/** Crear nuevo servidor websocket */
const io = new SocketServer(httpServer);

websockets(io);

/** --------------- middlewares ---------------*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(
    session({
        store: MongoStore.create({ mongoUrl: 'mongodb+srv://fimacharles:1zYle3sCAgmWEHVt@dbcoder.bpexbss.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 7200 }),
        secret: 'un-re-secreto',
        resave: true,
        saveUninitialized: true,
    })
);

/** --------------- frontend ---------------*/
app.engine("handlebars", exphbs.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/** --------------- passport --------------- */
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

/** --------------- routes --------------- */

// con FileSystem screen
app.use("/fs/home", homeFsRoutes);
// con FileSystem API
app.use("/fs/products", productFsRoutes);
app.use("/fs/carts", cartFsRoutes);

// con MongoDB screen
app.use("/home", homeRoutes);
app.use("/chat", chatRoutes);
app.use('/auth', authRouter);

// con MongoDB API
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);


/** --------------- connection mongoDB --------------- */
connectMongoDB();

const server = httpServer.listen(PORT, () =>
    console.log(
        `🚀 Server started on port ${PORT}. 
        at ${new Date().toLocaleString()}`
    )
);
server.on("error", (err) => console.log(err));


//----------------bcrypt------------------------------
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
