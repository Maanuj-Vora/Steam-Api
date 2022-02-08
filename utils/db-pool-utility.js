var mysql = require('mysql');
const fs = require('fs');

var pool = mysql.createPool({
    connectionLimit: 32000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: true
});

pool.on('acquire', function (connection) {
    const content = `Connection ${connection.threadId} acquired\n`;
    fs.appendFile('mysql-db.log', content, err => {
        if (err) {
            console.error(err);
            return
        }
    });
});

pool.on('connection', function (connection) {
    const content = 'New connection made within pool\n';
    fs.appendFile('mysql-db.log', content, err => {
        if (err) {
            console.error(err);
            return
        }
    });
});

pool.on('enqueue', function () {
    const content = 'Waiting for available connection slot\n';
    fs.appendFile('mysql-db.log', content, err => {
        if (err) {
            console.error(err);
            return
        }
    });
});

pool.on('release', function (connection) {
    const content = `Connection ${connection.threadId} released\n`;
    fs.appendFile('mysql-db.log', content, err => {
        if (err) {
            console.error(err);
            return
        }
    });
});

function mySQLQueryPromise(sql, args) {
    return new Promise((resolve, reject) => {
        pool.query(sql, args, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    pool: pool,
    mySQLQueryPromise: mySQLQueryPromise
}
