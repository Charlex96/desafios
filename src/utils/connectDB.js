import { connect } from "mongoose";

export async function connectMongo() {
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


// //----------------MONGO------------------------------
// import { connect, Schema, model } from 'mongoose';
// import faker from 'faker';
// import { UserModel } from './DAO/models/users.model.js';
// export async function connectMongo() {
//     try {
//         await connect(
//         /* PONER TU STRING ENTERO ACA */
//             'mongodb+srv://fimacharles:ZVWQvSnlMLw9Xqbd@dbcoder.bpexbss.mongodb.net/?retryWrites=true&w=majority'
//         );

//         let student = await StudentsModel.find({});
//         console.log(JSON.stringify(student, null, 2));
//         /* let student = await StudentsModel.findOne({ _id: '6477bde9d7627dafa9ea28b2' }); .populate('courses.course');
//         console.log(JSON.stringify(student, null, 2)); */

//         /* let student = await StudentsModel.findOne({ _id: '6477be0ac11ecddd0d42aa51' });
//         student.courses.push({ course: '6477c6d4c8f14bc83cca80f1' });
//         let res = await StudentsModel.updateOne({ _id: '6477be0ac11ecddd0d42aa51' }, student);
//         console.log(res); */

//         /* const created = CoursesModel.create({
//         topics: ['web', 'software', 'backend'],
//         students: [],
//         title: 'backend',
//         description: 'wonderfull backend course',
//         dificulty: 10,
//         professor: 'guile',
//         }); */

//         /* const created = StudentsModel.create({
//         first_name: 'monica',
//         last_name: 'fernanda',
//         email: 'g@g.com',
//         gender: 'femenino',
//         courses: [],
//         }); */

//         /* let res = await UserModel.find({ lastName: 'werwrwer' }).explain('executionStats');
//         console.log(res); */

//         /* (async () => {
//         const users = [];
//         for (let i = 0; i < 3000; i++) {
//             users.push({
//             firstName: faker.name.firstName(),
//             lastName: faker.name.lastName(),
//             email: faker.internet.email(),
//             });
//         }

//         try {
//             await UserModel.insertMany(users);
//             console.log('Inserted', users.length, 'users');
//         } catch (error) {
//             console.error('Error en insert many:', error);
//         }
//         })(); */
//     } catch (e) {
//         console.log(e);
//         throw 'can not connect to the db';
//     }
// }
