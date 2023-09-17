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

describe('POST /signup',()=>{
   it('responds with json', ()=>{
    return request(app)
    .post('/api/v1/books/signup')
    .send({ firstname: "Emmanuel", lastname:"hilary", username:"snrMan@1", password:"blackberry"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
   })

})


describe('POST /login', ()=>{
    it('responds with json', ()=>{
        return request(app)
        .post('/api/v1/books/login')
        .send({ username:"snrMan@1", password:"blackberry"})
        .auth('username', 'password')
        .set('Accept', 'application/json')
        .expect(200);
    })
})


describe('POST /logout', ()=>{
    it('it responds with json', ()=>{
        return request(app)
        .post('/api/v1/books/logout')
        .expect(200);
    })
})


/* Book Operation endpoints test */
describe('GET /getBooks', ()=>{
    it('it responds with json', ()=>{
        return request(app)
        .get('/api/v1/books/getBooks')
        .expect(200)
    })
})

describe('POST /addBook', ()=>{
    it("it responds with json", ()=>{
        return request(app)
        .post('/api/v1/books/addBook')
        .send({ author_name: "William Shakespare", author_email: "WilliamShakes10@gmail.com", book_title: "She stoops to Conquer"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    })
})

describe('GET /findBooks/:id', ()=>{
    it('responds with json', ()=>{
        const ParamID = 6;
        return request(app)
        .get(`/api/v1/books/findBooks/${ParamID}`)
        .expect(200)
    })
})

describe('UPDATE /updateBook/:id', ()=>{
    it('responds with json', ()=>{
        const paramID = 6;
        return request(app)
        .put(`/api/v1/books/updateBook/${paramID}`)
        .send({ author_name: "William Shakespare", author_email: "WilliamShakes10@gmail.com", book_title: "She stoops to Conquer"})
        .expect(200);
      

    })
})

describe('DELETE deleteBook/:id', ()=>{
    it('responds with json', ()=>{
        const ParamID = 6;
        request(app)
        .delete(`/api/v1/books/deleteBook/${ParamID}`)
        .expect(200);
      
        
    })
})