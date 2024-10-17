"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = __importDefault(require("pg"));
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = require("./middleware/auth");
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
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api', index_1.default);
app.all('*', (req, res) => {
    res.status(404).json({ error: "This page not found" });
});
// app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//         if(!res.headersSent) return next(err)
//         res.status(500).send('main Error')
// })
// @ts-ignore
app.use(auth_1.authMiddleware);
app.listen(PORT, () => console.log('YEP'));
