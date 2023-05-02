// const fs = require('fs');
import fs from 'fs';

// const { stringify } = require('querystring');


class ProductManager{
    constructor(){
        this.path = './src/productos.json';
        // this.products = [];
        this.id = 1;

        // const productsString = fs.readFileSync(this.path, 'utf-8');
        // const products = JSON.parse(productsString);
        // this.products = products;
    }

    async getProducts(){
        try {

            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
            }

            await fs.promises.writeFile(this.path, JSON,stringify([]));
            return [];
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProduct(product){

        try {
            
            let data = await this.getProducts();
            console.log(data);
    
            let checkCode = data.find((p) => p.code === product.code);
            if (checkCode) {
                return 'This code already exists';
            }
    
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                return 'Fields missing';
            }
    
            product.id = this.id;
            // this.id;
    
            let newProduct = {...product, id: this.id}
            this.id++;
    
            data.push(newProduct);
            const productsString = JSON.stringify(data);
            await fs.promises.writeFile(this.path, productsString);
    
            return 'Product added';

        } catch (error) {
            throw new Error(error.message);
        }


    }


    async updateProduct(id, updatedProduct) {

        try {
            
            let data = await this.getProducts();
            let index = data.findIndex((p) => p.id === id);
            if (index === -1) {
                return 'Product not found';
            }
    
            if (updatedProduct.code) {
                let checkCode = data.find((p) => p.code === updatedProduct.code && p.id !== id);
                if (checkCode) {
                    return 'This code already exists';
                }
            }
    
            let updated = { ...data[index], ...updatedProduct, id };
            data[index] = updated;
    
            const productsString = JSON.stringify(data);
            fs.writeFileSync(this.path, productsString);
    
            return 'Product updated';
            
        } catch (error) {
            throw new Error(error.message);
        }

    }


    async deleteProduct(id){

        try {
            
            let data = await this.getProducts();
            const index = data.findIndex((p) => p.id === id);
            if (index === -1) {
                return 'Product not found';
            }
    
            data.splice(index, 1);
            const productsString = JSON.stringify(data);
            fs.writeFileSync(this.path, productsString);
    
            return 'Product deleted';

        } catch (error) {
            throw new Error(error.message);
        }

    }


    // getProducts(){
    //     return data;
    // }


    async getProductsById(id){

        try {

            let data = await this.getProducts();
            let found = data.find((p) => p.id === id);
            if (!found) {
                return 'Product not found';
            }
    
            return found;

        } catch (error) {
            throw new Error(error.message);
        }

    }
}



// const productManeger = new ProductManager('productos.json');


const product = {
    title: 'Nike Shoes',
    description: 'shoes running',
    price: '10',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES',
    stock: '4'
}
const product2 = {
    title: 'Adidas Shoes',
    description: 'shoes running',
    price: '10',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES124',
    stock: '2'
}
const product3 = {
    title: 'Adidas ',
    description: 'shoes running',
    price: '0',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES001',
    stock: '1'
}

// const asyncFn = async () =>{
//     console.log(await productManeger.addProduct(product));
// }

// asyncFn();



// console.log(productManeger.addProduct(product));
// console.log(productManeger.addProduct(product2));
// console.log(productManeger.addProduct(product3));

// console.log(productManeger.updateProduct(1, product));
// console.log(productManeger.updateProduct(2, product2));
// // console.log(productManeger.deleteProduct(2));

// console.log(productManeger.getProducts()); 
// console.log(productManeger.getProductsById(1));


// module.exports = ProductManager;

export default ProductManager;