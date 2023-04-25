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

        this.id;
        product.id = this.id;

        let newProduct = {...product, id: this.id}
        this.id++;

        this.products.push(product);
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);

        return 'Product added';

    }

    updateProduct(product){
        fs.writeFileSync(this.path, product);
    }

    deleteProduct(id){
        let found = this.products.find((p) => p.id === id);
        if (!found) {
            return 'Not found'
        }

        return fs.writeFileSync(this.path, found);
        ;
    }

    getProducts(){
        return this.products;
    }

    getProductsById(id){
        let found = this.products.find((p) => p.id === id);
        if (!found) {
            return 'Not found'
        }

        return found;
    }
}



const productManeger = new ProductManager('productos.json');


const product = {
    title: 'Nike Shoes',
    description: 'shoes running',
    price: '200',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES123',
    stock: '4'
}
const product2 = {
    title: 'Adidas Shoes',
    description: 'shoes running',
    price: '100',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES124',
    stock: '2'
}
const product3 = {
    title: 'Adidas ',
    description: 'shoes running',
    price: '150',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES001',
    stock: '1'
}



console.log(productManeger.addProduct(product));

// console.log(productManeger.updateProduct(product3))
// console.log(productManeger.deleteProduct(1));

console.log(productManeger.getProducts()); 
console.log(productManeger.getProductsById(1));