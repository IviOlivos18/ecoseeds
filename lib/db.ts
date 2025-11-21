import mysql from 'mysql2/promise';

const isProduction = process.env.NODE_ENV === 'production';

const pool = mysql.createPool({
    host: isProduction ? process.env.DB_HOST : process.env.DB_HOST_DEV,
    port: parseInt(isProduction ? process.env.DB_PORT || '7539' : process.env.DB_PORT_DEV || '7539'),
    user: isProduction ? process.env.DB_USER : process.env.DB_USER_DEV,
    password: isProduction ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_DEV,
    database: isProduction ? process.env.DB_NAME : process.env.DB_NAME_DEV,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
