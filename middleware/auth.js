"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = require("../errors/errors");
const authMiddleware = async (error, req, res, next) => {
    console.log('middleware');
    if (error[1]) {
        if ((0, errors_1.getError)(error[0].name))
            return res.status(error[0].status).json({ message: error[0].message, detailse: error[1] });
    }
    else {
        if ((0, errors_1.getError)(error.name))
            return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: 'BIG ERROR' });
};
exports.authMiddleware = authMiddleware;
