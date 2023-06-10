import {CartsModel} from '../DAO/models/carts.model.js';

export class CartsService{

    async createOne(){
        const cartCreated = await CartsModel.create();
        return cartCreated;
    }

    async get(cartId){
        const cart = await CartsModel.findById(cartId).populate('products.product');
        if(!cart){
            throw new Error('Cart not found');
        }

        return cart;
    }
}