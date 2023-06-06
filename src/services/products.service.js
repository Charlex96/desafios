import { ProductsModel } from '../DAO/models/products.model.js';

export class ProductsService {

    async getAll() {
        const products = await ProductsModel.find({});
        return products;
    }

    async createOne(title, description, price, code, stock, thumbnail, category) {
        this.validateUser(title, description, price, code, stock, thumbnail, category);
        const userCreated = await ProductsModel.create({ title, description, price, code, stock, thumbnail, category });
        return userCreated;
    }

    async deletedOne(_id) {
        const deleted = await ProductsModel.deleteOne({ _id: _id });
        return deleted;
    }

    async updateOne(_id, title, description, price, code, stock, thumbnail, category) {
        if (!_id) throw new Error('invalid _id');
        this.validateUser(title, description, price, code, stock, thumbnail, category);
        const productUptaded = await ProductsModel.updateOne({ _id: id }, { title, description, price, code, stock, thumbnail, category });
        return productUptaded;
    }
}
