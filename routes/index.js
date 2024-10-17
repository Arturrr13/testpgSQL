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
const express_1 = require("express");
const usersController = __importStar(require("./users/users.controller"));
const booksController = __importStar(require("./books/books.controller"));
const authController = __importStar(require("./auth/auth.controller"));
const admin_1 = require("../middleware/admin");
const router = (0, express_1.Router)();
const authRouter = (0, express_1.Router)();
const tryFunc = async (func, res, next) => {
    try {
        func;
    }
    catch (error) {
        next(error);
    }
};
router.get('/users', admin_1.adminMiddleware, async (req, res, next) => tryFunc(await usersController.getAllUsers(req, res), res, next));
router.get('/user/:name', async (req, res, next) => tryFunc(await usersController.getUser(req, res), res, next));
router.delete('/user/:id', async (req, res, next) => tryFunc(await usersController.deleteUser(req, res), res, next));
router.get('/books', async (req, res, next) => {
    // const newUser = await sql.query(`INSERT INTO users (name, email) values ($1, $2) RETURNING *`, ['User1', 'user1@gmail.com'])
    //const newUser = await sql.query('SELECT * FROM users')
    // resp.json(newUser)
    tryFunc(await booksController.getAllBooks(req, res), res, next);
});
authRouter.post('/signup', async (req, res, next) => tryFunc(await authController.signUp(req, res), res, next));
authRouter.post('/login', async (req, res, next) => tryFunc(await authController.logIn(req, res, next), res, next));
authRouter.post('/activate/:id', async (req, res, next) => tryFunc(await authController.activateAccount(req, res, next), res, next));
authRouter.get('/refresh', async (req, res, next) => tryFunc(await authController.refreshToken(req, res), res, next));
router.use('/auth', authRouter);
exports.default = router;
