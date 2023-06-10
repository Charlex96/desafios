// import mongoose from "mongoose";
// import "dotenv/config";

// const config = {
//   mongoDB: {
//     URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dbcoder.bpexbss.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority `,
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//   },
// };

// export const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
//     console.log("Connected to Mongo Atlas");
//   } catch (error) {
//     console.log("Error en la conexión con Mongo Atlas", error);
//   }
// };



import { connect } from "mongoose";

export async function connectMongoDB() {
    try {
        await connect(
            "mongodb+srv://fimacharles:1zYle3sCAgmWEHVt@dbcoder.bpexbss.mongodb.net/ecommerce?retryWrites=true&w=majority"
        );
        
        console.log("plug to mongo!");
    } catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
}
