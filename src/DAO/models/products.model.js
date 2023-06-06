//@ts-check
import { Schema, model } from "mongoose";

const schema = new Schema({
    // id: { type: Schema.Types.ObjectId, ref:"products"},
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 100 },
    thumbnail: { type: String, max: 200 },
    code: { type: String, required: true, max: 100, unique: true},
    stock: { type: Number, required: true, max: 100 },
    status: { type: Boolean, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
}, {_id: false});

export const ProductsModel = model("products", schema);

