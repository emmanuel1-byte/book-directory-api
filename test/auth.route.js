const app = require('../app');
const request = require('supertest');

/* root path Test*/

describe('Test the root path', ()=>{
    it('it should response the GET method', ()=>{
       return request(app)
        .get('/')
        .expect(200)
        
    })
})

/* Authentication endpoints test */

// describe('POST /signup',()=>{
//    it('should create a new user account ', ()=>{
//     return request(app)
//     .post('/api/v1/auth/signup')
//     .send({ firstname: "johnas", lastname:"tim", username:"cooker", password:"blackberry090"})
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(201)
//    })

// })


// describe('POST /login', ()=>{
//     it('should log the user into his account', ()=>{
//         return request(app)
//         .post('/api/v1/auth/signin')
//         .send({ username:"cooker", password:"blackberry090"})
//         .auth('username', 'password')
//         .set('Accept', 'application/json')
//         .expect(200);
//     })
// })


// describe('POST /logout', ()=>{
//     it('should log the user out of his account', ()=>{
//         return request(app)
//         .post('/api/v1/auth/signout')
//         .expect(200);
//     })
// })
