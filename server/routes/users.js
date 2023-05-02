/*
Author: Sterling
*/

const express = require('express');
const users = express.Router();

const db = require('../js_modules/database');

users.get('/', async (req, res) => {
    const connection = db.connectToDataBase('users');
    const users_res = await db.getRecordElement(connection, 'users', ['id', 'username'], true);
    db.disconnect(connection);
    res.json(users_res);
})

module.exports = users;