const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const { PostgresDialect } = require ('@sequelize/postgres')
const Pool = require('pg').Pool
const PORT = process.env.PORT || 5000
const sql = new Pool({
    // user: 'artur',
    // password: 'n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf',
    // host: 'dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com',
    // port: 5432,
    // database: 'testdb_d9tv',
    connectionString: 'postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv',
    ssl: true
})
// const sequelize = new Sequelize('testdb_d9tv', 'artur', 'n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf', {
//     dialect: 'postgres',
//     //database: 'testdb_d9tv',
//     //user: 'artur',
//     //password: 'n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf',
//     host: 'dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com',
//     //port: 5432,
//     //clientMinMessages: 'notice',
//     logging: false,
//     ssl: true,
// })
const sequelize = new Sequelize('postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv?ssl=true', {
    dialect: "postgres",
    logging: false,
})
const app = express()

app.get('/users', async (req, resp) => {
    // const newUser = await sql.query(`INSERT INTO users (name, email) values ($1, $2) RETURNING *`, ['User1', 'user1@gmail.com'])
    //const newUser = await sql.query('SELECT * FROM users')
    // resp.json(newUser)

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.')
    }).catch((error) => {
       console.error('Unable to connect to the database: ', error)
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
     
    sequelize.sync().then(() => {
        //Book.create({
        //    title: "Clean Code",
        //    author: "Robert Cecil Martin",
        //    release_date: "2021-12-14",
        //    subject: 3
        //}).then(res => {
        //    console.log(res)
        //}).catch((error) => {
        //    console.error('Failed to create a new record : ', error)
        //})
        Book.findAll().then(res => {
            console.log(res)
            resp.json(res)
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error)
        })
    }).catch((error) => {
        console.error('Unable to create table : ', error)
    })
})

app.use(express.json())
//app.use('/api', router)

app.listen(PORT, () => {
    console.log('YEP')
})