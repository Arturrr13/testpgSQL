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
exports.refreshToken = exports.activateAccount = exports.logIn = exports.signUp = void 0;
const service = __importStar(require("./auth.service"));
const auth_sendEmail_1 = require("../../services/auth.sendEmail");
const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await service.signUpUser(name, email, password);
    if (result) {
        await (0, auth_sendEmail_1.sendEmail)(email, result[0].id, req);
        res.cookie('ref_t', result[1].refresh_token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }); // 2h
        res.status(200).send(result);
    }
};
exports.signUp = signUp;
const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await service.logInUser(email, password);
        if (result) {
            res.cookie('ref_t', result[1].refresh_token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }); // 2h
            res.status(200).send(result);
        }
    }
    catch (e) {
        next(e);
    }
};
exports.logIn = logIn;
const activateAccount = async (req, res, next) => {
    try {
        const result = await service.activateAccount(req.params.id);
        if (result)
            res.status(200).send(result);
    }
    catch (e) {
        next(e);
    }
};
exports.activateAccount = activateAccount;
const refreshToken = async (req, res) => {
    // @ts-ignore
    const { ref_t } = req.cookies();
    const result = await service.refreshToken(ref_t);
    if (result) {
        res.cookie('ref_t', result[1].refresh_token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }); // 2h
        res.status(200).send(result);
    }
};
exports.refreshToken = refreshToken;
