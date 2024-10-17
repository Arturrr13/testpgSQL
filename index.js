"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const pg_1 = __importDefault(require("pg"));
const index_1 = __importDefault(require("./routes/index"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const Pool = pg_1.default.Pool;
const sql = new Pool({
    // user: 'artur',
    // password: 'n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf',
    // host: 'dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com',
    // port: 5432,
    // database: 'testdb_d9tv',
    connectionString: 'postgresql://artur:n3VuvCB4ohgbOdh3nnyRz6sxb2wWRjUf@dpg-crtvrue8ii6s73apsg80-a.oregon-postgres.render.com/testdb_d9tv',
    ssl: true
});
//router.get('/books', async (req, res) => {
//    // const newUser = await sql.query(`INSERT INTO users (name, email) values ($1, $2) RETURNING *`, ['User1', 'user1@gmail.com'])
//    //const newUser = await sql.query('SELECT * FROM users')
//    // resp.json(newUser)
//    res.json(await getAllBooks())
//})
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/api', index_1.default);
app.listen(PORT, () => {
    console.log('YEP', PORT, process.env.PUBLIC_URL);
});
