import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


// app.get('*', (req, res) =>{
//     res.status(404).json({
//         status: 'error',
//         msg: 'no esta implementada la ruta!!',
//         data: {},
//     });
// });


try {
    
    app.listen(PORT, () =>{
        console.log(`Listening on port: ${PORT} at ${new Date().toLocaleDateString()}`);
    });

} catch (error) {

    console.log('Error al iniciar el servidor', error);

}

