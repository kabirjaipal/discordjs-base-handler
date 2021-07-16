const { reconDB } = require("reconlx");
const config = require('../config/config.json');
const client = require("..");

const db = new reconDB(client , {
    uri : config.mongooseConnectionString,
});
console.log(`DB Connected`.red);
module.exports = db;