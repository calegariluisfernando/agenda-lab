import mysql from "mysql2/promise";

const configConnection = {
    host: 'database',
    user: 'root',
    password: '123',
    database: 'agendaLab'
};

const connection = await mysql.createConnection(configConnection);

export default connection;