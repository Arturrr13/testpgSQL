"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.activateAccount = exports.logInUser = exports.signUpUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("../../sequelize/sequelize");
const errors_1 = require("../../errors/errors");
const signUpUser = async (name, email, password) => {
    let checkUser = await sequelize_1.sequelize.sync().then(async () => await sequelize_1.User.findOne({ where: { email: email } })).catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
    if (checkUser)
        throw new Error('User already exist');
    const userPassword = await bcryptjs_1.default.hash(password, 8);
    let user = await sequelize_1.sequelize.sync()
        .then(async () => await sequelize_1.User.create({
        name: name,
        email: email,
        password: userPassword,
        isactive: false
    }))
        .catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
    const accessToken = jsonwebtoken_1.default.sign({ name: name, email: email, password: userPassword }, 'secretKeySOSI', { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ name: name, email: email, password: userPassword }, 'secretKeySOSI', { expiresIn: '2h' });
    if (user?.dataValues) {
        let getjwt = await sequelize_1.sequelize.sync()
            .then(async () => await sequelize_1.Jwt.create({
            user_id: user.dataValues.id,
            //access_token: accessToken,
            refresh_token: refreshToken
        }))
            .catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
        return [user?.dataValues, getjwt?.dataValues, accessToken];
    }
};
exports.signUpUser = signUpUser;
const logInUser = async (email, password) => {
    const user = await sequelize_1.sequelize.sync().then(async () => await sequelize_1.User.findOne({ where: { email: email } })).catch(async (error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
    if (!user)
        throw (0, errors_1.getError)('unauthorized');
    if (user?.dataValues) {
        const checkPassword = await bcryptjs_1.default.compare(password, user.dataValues.password);
        if (!checkPassword)
            throw (0, errors_1.getError)('wrongPassword');
        const getjwt = await sequelize_1.sequelize.sync().then(async () => await sequelize_1.Jwt.findOne({ where: { user_id: user.dataValues.id } })).catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
        const accessToken = jsonwebtoken_1.default.sign({ email: email, password: user.dataValues.password }, 'secretKeySOSI', { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ email: email, password: user.dataValues.password }, 'secretKeySOSI', { expiresIn: '2h' });
        if (getjwt?.dataValues) {
            getjwt.dataValues.refresh_token = refreshToken;
            await getjwt.save();
        }
        return [user?.dataValues, getjwt?.dataValues, accessToken];
    }
};
exports.logInUser = logInUser;
const activateAccount = async (id) => {
    const user = await sequelize_1.sequelize.sync().then(async () => await sequelize_1.User.findOne({ where: { id: id } })).catch(async (error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
    if (!user)
        throw (0, errors_1.getError)('userNotFound');
    if (user?.dataValues) {
        user.dataValues.isactive = true;
        await user.save();
        return [user?.dataValues];
    }
};
exports.activateAccount = activateAccount;
const refreshToken = async (ref_t) => {
    const validateRefreshT = jsonwebtoken_1.default.verify(ref_t, 'secretKeySOSI');
    const getjwt = await sequelize_1.sequelize.sync().then(async () => await sequelize_1.Jwt.findOne({ where: { refresh_token: ref_t } })).catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
    if (!getjwt?.dataValues || !validateRefreshT) {
        //err
        console.log('bad');
    }
    else {
        const user = await sequelize_1.sequelize.sync().then(async () => await sequelize_1.User.findOne({ where: { user_id: getjwt?.dataValues.user_id } })).catch((error) => { throw [(0, errors_1.getError)('databaseUnable'), error]; });
        if (user?.dataValues) {
            const accessToken = jsonwebtoken_1.default.sign({ email: user.dataValues.email, password: user.dataValues.password }, 'secretKeySOSI', { expiresIn: '15m' });
            const refreshToken = jsonwebtoken_1.default.sign({ email: user.dataValues.email, password: user.dataValues.password }, 'secretKeySOSI', { expiresIn: '2h' });
            getjwt.dataValues.refresh_token = refreshToken;
            await getjwt.save();
            return [user?.dataValues, getjwt?.dataValues, accessToken];
        }
    }
};
exports.refreshToken = refreshToken;
const validateAccessT = () => {
};
const validateRefreshT = () => {
};
const findT = async () => {
};
// const decoded = jwt.verify(token, 'secretKeySOSI');
// console.log(decoded)
