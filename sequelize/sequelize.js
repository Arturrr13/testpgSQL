"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv?ssl=true', {
    dialect: "postgres",
    logging: false,
});
exports.Book = sequelize.define("books", {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: sequelize_1.DataTypes.DATEONLY,
    },
    subject: {
        type: sequelize_1.DataTypes.INTEGER,
    }
});
exports.User = sequelize.define("users", {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    jwt: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    }
}, { timestamps: false, tableName: 'users' });
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.')
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error)
// })
