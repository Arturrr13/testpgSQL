const express = require('express')
const Pool = require('pg').Pool

const { getAllBooks, setNewUser, deleteUser, getUser, getAllUsers } = require('./sequelize/sequelize')

const PORT = process.env.PORT || 5000
const app = express()
const router = new express()

const sql = new Pool({
    // user: 'artur',
    // password: 'n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf',
    // host: 'dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com',
    // port: 5432,
    // database: 'testdb_d9tv',
    connectionString: 'postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv',
    ssl: true
})

router.get('/books', async (req, res) => {
    // const newUser = await sql.query(`INSERT INTO users (name, email) values ($1, $2) RETURNING *`, ['User1', 'user1@gmail.com'])
    //const newUser = await sql.query('SELECT * FROM users')
    // resp.json(newUser)
    res.json(await getAllBooks())
})

router.get('/users', async (req, res) => {
    res.json(await getAllUsers())
})

router.get('/user/:name', async (req, res) => {
    const name = req.params.name
    res.json(await getUser(name))
})

router.post('/user', async (req, res) => {
    const { name, email, password } = req.body
    res.json(await setNewUser(name, email, password))
})

router.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    res.json(await deleteUser(id))
})

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log('YEP')
})