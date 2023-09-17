const app = require('../app');
const request = require('supertest');
app.listen(5678, ()=>{
    console.log("server is listening on port 5678")
})

