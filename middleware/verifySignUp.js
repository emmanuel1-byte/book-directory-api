const db = require('../db/connection');
const { ParameterizedQuery : PQ } = require('pg-promise');
const verifyUsername = (req, res, next)=>{
    const usernamequery = new PQ({ text : "SELECT * FROM usertb WHERE username = $1", values:[req.body.username]})
    db.any(usernamequery).then((row)=>{
        if(row[0]){ 
            return res.status(401).json({
                error: "true",
                reason : "username is already in use"
            })
        }
        next();
    })
}

module.exports = {
    verifyUsername
}