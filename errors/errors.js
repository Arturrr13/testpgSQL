"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getError = exports.errors = void 0;
exports.errors = [
    {
        name: 'unauthorized',
        status: 401,
        message: 'User unauthorized'
    },
    {
        name: 'wrongPassword',
        status: 401,
        message: 'Wrong password'
    },
    {
        name: 'badRequest',
        status: 400,
        message: 'Bad request'
    },
    {
        name: 'userNotFound',
        status: 404,
        message: 'user not found'
    },
    {
        name: 'databaseUnable',
        status: 503,
        message: 'Unable to connect to database: '
    }
];
const getError = (err) => exports.errors.find(el => el.name === err);
exports.getError = getError;
