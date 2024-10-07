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
exports.deleteUser = exports.setNewUser = exports.getUser = exports.getAllUsers = void 0;
const service = __importStar(require("./users.service"));
const getAllUsers = async (req, res) => {
    res.status(200).json(await service.getAllUsers());
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    const name = req.params.name;
    res.status(200).json(await service.getUser(name));
};
exports.getUser = getUser;
const setNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    res.status(200).json(await service.setNewUser(name, email, password));
};
exports.setNewUser = setNewUser;
const deleteUser = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await service.deleteUser(id));
};
exports.deleteUser = deleteUser;
