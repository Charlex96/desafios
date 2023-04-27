const fs = require('fs');


class ProductManager{
    constructor(path){
        this.path = path;
        this.products = [];
        this.id = 1;

        const productsString = fs.readFileSync(this.path, 'utf-8');
        const products = JSON.parse(productsString);
        this.products = products;
    }

    addProduct(product){
        let checkCode = this.products.find((p) => p.code === product.code);
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

        this.products.push(product);
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);

        return 'Product added';

    }


    updateProduct(id, updatedProduct) {
        let index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            return 'Product not found';
        }

        if (updatedProduct.code) {
            let checkCode = this.products.find((p) => p.code === updatedProduct.code && p.id !== id);
            if (checkCode) {
                return 'This code already exists';
            }
        }

        let updated = { ...this.products[index], ...updatedProduct, id };
        this.products[index] = updated;

        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);

        return 'Product updated';
    }


    deleteProduct(id){
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            return 'Product not found';
        }

        this.products.splice(index, 1);
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);

        return 'Product deleted';
    }


    getProducts(){
        return this.products;
    }


    getProductsById(id){
        let found = this.products.find((p) => p.id === id);
        if (!found) {
            return 'Product not found';
        }

        return found;
    }
}



const productManeger = new ProductManager('productos.json');


const product = {
    title: 'Nike Shoes',
    description: 'shoes running',
    price: '100',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES',
    stock: '4'
}
const product2 = {
    title: 'Adidas Shoes',
    description: 'shoes running',
    price: '200',
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



// console.log(productManeger.addProduct(product));
// console.log(productManeger.addProduct(product2));
// console.log(productManeger.addProduct(product3));

// console.log(productManeger.updateProduct(1, product));
// console.log(productManeger.updateProduct(2, product2));
console.log(productManeger.deleteProduct(2));

console.log(productManeger.getProducts()); 
console.log(productManeger.getProductsById(1));