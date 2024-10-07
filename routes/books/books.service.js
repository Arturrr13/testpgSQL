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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = exports.setNewBook = void 0;
const sequelize = __importStar(require("../../sequelize/sequelize"));
const setNewBook = async (title, author, release_date, subject) => {
    let result;
    await sequelize.Book.create({
        title: "Clean Code",
        author: "Robert Cecil Martin",
        release_date: "2021-12-14",
        subject: 3
    })
        .then(res => {
        console.log(res);
    })
        .catch((error) => console.error('Failed to create a new record : ', error));
    return result;
};
exports.setNewBook = setNewBook;
const getAllBooks = async () => {
    let result;
    await sequelize.Book.findAll()
        .then(res => result = res)
        .catch((error) => console.error('Failed to retrieve data : ', error));
    return result;
};
exports.getAllBooks = getAllBooks;
