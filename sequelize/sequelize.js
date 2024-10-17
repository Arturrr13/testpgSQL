"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = exports.User = exports.Book = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv?ssl=true', {
    dialect: "postgres",
    logging: false,
});
exports.Book = exports.sequelize.define("books", {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
exports.User = exports.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isactive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    tstz: {
        type: sequelize_1.DataTypes.TIME
    }
}, { timestamps: false, tableName: 'users' });
exports.Jwt = exports.sequelize.define("jwt", {
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    // access_token: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    refresh_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false, tableName: 'jwt' });
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.')
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error)
// })
