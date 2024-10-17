"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors/errors");
const adminMiddleware = async (req, res, next) => {
    console.log('admin');
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return next((0, errors_1.getError)('unauthorized'));
        const accessT = authHeader?.split(' ')[1];
        const validateAccessT = accessT ? jsonwebtoken_1.default.verify(accessT, 'secretKeySOSI') : null;
        if (!validateAccessT)
            return next((0, errors_1.getError)('unauthorized'));
        next();
    }
    catch (e) {
        console.log('bad2');
        next((0, errors_1.getError)('unauthorized'));
    }
};
exports.adminMiddleware = adminMiddleware;
