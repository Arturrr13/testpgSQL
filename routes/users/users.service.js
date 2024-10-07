"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = exports.deleteUser = exports.setNewUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize = __importStar(require("../../sequelize/sequelize"));
const setNewUser = async (name, email, password) => {
    const userPassword = await bcryptjs_1.default.hash(password, 8);
    const token = jsonwebtoken_1.default.sign({ name: name, email: email, password: password }, "secretKeySOSI", {});
    // const decoded = jwt.verify(token, 'secretKeySOSI');
    // console.log(decoded)
    let result = await sequelize.User.create({
        name: name,
        email: email,
        jwt: token,
        password: userPassword
    });
    return result;
};
exports.setNewUser = setNewUser;
const deleteUser = async (id) => {
    let result = await sequelize.User.destroy({
        where: {
            id: id
        }
    });
    return result;
};
exports.deleteUser = deleteUser;
const getUser = async (name) => {
    let result = await sequelize.User.findOne({
        where: {
            name: name
        }
    });
    // .then((res: Response) => result = res)
    // .catch((error: Error) => console.error('Failed to retrieve data : ', error))
    return result;
};
exports.getUser = getUser;
const getAllUsers = async () => {
    let result = await sequelize.User.findAll();
    return result;
};
exports.getAllUsers = getAllUsers;
