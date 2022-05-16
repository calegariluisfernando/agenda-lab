import mysql from "mysql2/promise";

const connection = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: '123',
    database: 'agendaLab'
});

export default connection;