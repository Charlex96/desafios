import express from 'express';
import ProductManager from './productManager.js';

const productManager = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/products', async (req, res) =>{

    try {
        
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }

    } catch (error) {
        res.json({message: `error: ${error}`});
        
    }

});

app.get('/products/:id', async (req, res)=>{

    try {

        const id = req.params.id;
        const product = await productManager.getProductsById(parseInt(id));
        if (id) {
            res.json(product);
        } else {
            res.json({error: 'Product not found'});
        }
        
    } catch (error) {
        res.json({message: `error: ${error}`});
        
    }

});


app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
})