import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sistventa'
});


pool.getConnection(function(err){
    if(err) throw err;
    console.log("Database connected!")
});