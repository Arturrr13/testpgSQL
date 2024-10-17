"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = exports.deleteUser = void 0;
const sequelize_1 = require("../../sequelize/sequelize");
const errors_1 = require("../../errors/errors");
const deleteUser = async (id) => {
    const res = await sequelize_1.sequelize.sync()
        .then(async () => {
        await sequelize_1.Jwt.destroy({ where: { user_id: id } });
        await sequelize_1.User.destroy({ where: { id: id } });
    })
        .catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
    return [res];
};
exports.deleteUser = deleteUser;
const getUser = async (name) => sequelize_1.sequelize.sync().then(() => sequelize_1.User.findOne({ where: { name: name } })).catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
exports.getUser = getUser;
const getAllUsers = async () => sequelize_1.sequelize.sync().then(() => sequelize_1.User.findAll()).catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
exports.getAllUsers = getAllUsers;
// import { DataType } from 'sequelize'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// export const setNewUser = async (name: string, email: string, password: string) => {
//     const userPassword = await bcrypt.hash(password, 8)
//     return sequelize.sync()
//     .then(() => {
//         return User.create({
//             name: name,
//             email: email,
//             isactive: false,
//             password: userPassword
//         })
//     })
//     .catch((error: Error) => console.error('Unable to connect: ', error))
// }
