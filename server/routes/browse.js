/*
Author: Sterling
*/

const express = require('express');
const browse = express.Router();

const db = require('../js_modules/database');

browse.get('/timeseries', async (req, res) => {
    const connection = db.connectToDataBase('time_series');
    const fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
    const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', fields, true);
    db.disconnect(connection);
    res.json(timeseries_res);
})

browse.get('/users', async (req, res) => {
    const connection = db.connectToDataBase('users');
    const fields = ['id', 'username'];
    const users_res = await db.getRecordElement(connection, 'users', fields, true);
    db.disconnect(connection);
    res.json(users_res);
})

module.exports = browse;