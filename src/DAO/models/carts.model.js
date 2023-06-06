//@ts-check
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    items:[{
        productId:{
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        },
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export const CartsModel = model("carts", cartSchema);

