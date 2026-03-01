"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
const query = async (text, params) => {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res.rows;
    }
    catch (err) {
        console.error("Database Error:", err);
        throw err;
    }
    finally {
        client.release();
    }
};
exports.query = query;
//# sourceMappingURL=db.js.map