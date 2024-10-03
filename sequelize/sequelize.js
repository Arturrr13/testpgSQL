const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const sequelize = new Sequelize('postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv?ssl=true', {
    dialect: "postgres",
    logging: false,
})

const Book = sequelize.define("books", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATEONLY,
    },
    subject: {
        type: DataTypes.INTEGER,
    }
})

const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    jwt: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, { timestamps: false, tableName: 'users' })

const setNewBook = async (title, author, release_date, subject) => {
    let result 

    await Book.create({
        title: "Clean Code",
        author: "Robert Cecil Martin",
        release_date: "2021-12-14",
        subject: 3
    })
    .then(res => {
        console.log(res)
    })
    .catch((error) => console.error('Failed to create a new record : ', error))

    return result
}

const getAllBooks = async () => {
    let result 

    await Book.findAll()
    .then(res => result = res)
    .catch((error) => console.error('Failed to retrieve data : ', error))

    return result
}

const setNewUser = async (name, email, password) => {
    let result 
    const userPassword = await bcrypt.hash(password, 8)
    const token = jwt.sign({ name: name, email: email, password: password }, "secretKeySOSI", {})

    // const decoded = jwt.verify(token, 'secretKeySOSI');
    // console.log(decoded)

    await User.create({
        name: name,
        email: email,
        jwt: token,
        password: userPassword
    })
    .then(res => result = res)
    .catch((error) => console.error('Failed to create a new record : ', error))

    return result
}

const deleteUser = async (id) => {
    let result 

    await User.destroy({
        where: {
            id: id
        }
    })
    .then(res => result = res)
    .catch((error) => console.error('Failed to delete user : ', error))

    return result
}

const getUser = async (name) => {
    let result 

    await User.findOne({
        where: {
            name: name
        }
    })
    .then(res => result = res)
    .catch((error) => console.error('Failed to retrieve data : ', error))

    return result
}

const getAllUsers = async () => {
    let result 

    await User.findAll()
    .then(res => result = res)
    .catch((error) => console.error('Failed to retrieve data : ', error))

    return result
}

module.exports = { setNewBook, getAllBooks, setNewUser, deleteUser, getUser, getAllUsers }


// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.')
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error)
// })