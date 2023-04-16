class ProductManager{
    constructor(){
        this.products = [];
        this.id = 1;
    }

    addProduct(product){
        let checkCode = this.products.find((p) => p.code === product.code);
        if (checkCode) {
            return 'This code already exists';
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return 'Fields missing';
        }

        // this.id;
        // product.id = this.id;

        let newProduct = {...product, id: this.id}

        this.products.push(newProduct);
        this.id++;

        return 'Product added';

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


const product = {
    title: 'Nike Shoes',
    description: 'shoes running',
    price: '200',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES123',
    stock: '4'
}
const product2 = {
    title: 'Nike Shoes',
    description: 'shoes running',
    price: '200',
    thumbnail: 'https://worthly.com/wp-content/uploads/2014/11/139517568.jpg',
    code: 'SHOES124',
    stock: '4'
}

const productManeger = new ProductManager();


console.log(productManeger.addProduct(product));
console.log(productManeger.addProduct(product2));

console.log(productManeger.getProducts());
console.log(productManeger.getProductsById(1));