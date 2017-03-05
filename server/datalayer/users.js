'use strict';
const db = require('./database');

// Users functions
function getUser(con, username) {
    return db.execQuery(con, `SELECT * FROM users WHERE username=?`, username);
}

function getUsers(con) {
    return db.execQuery(con, `SELECT * FROM users`);
}

function addUser(con, user) {
    return db.execQuery(con, `INSERT INTO users SET ?`, user)
}

module.exports = {
    getUser,
    getUsers,
    addUser
}