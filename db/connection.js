const pgp = require('pg-promise')();
require('dotenv').config();
const connection = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

/* String url
`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
*/


/*Exporting the Database Object for Shared Import */
module.exports = connection ;
