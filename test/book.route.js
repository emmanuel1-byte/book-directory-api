const app = require('../app');
const request = require('supertest');

/* Book Operation endpoints test */
describe('POST /addBook', ()=>{
    it("should add a book", ()=>{
        return request(app)
        .post('/api/books/addBook')
        .send({ author_name: "frey", author_email: "frey10@gmail.com", book_title: "wounded"})
        // .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(201);
    })
})

// describe('GET /getBooks', ()=>{
//     it('should show all books available', ()=>{
//         return request(app)
//         .get('/api/books/getBooks')
//         .expect(200)
//     })
// })


// describe('UPDATE /updateBook/:id', ()=>{
//     it('should update a book by it"s id', ()=>{
//         const paramID = 2;
//         return request(app)
//         .put(`/api/books/updateBook/${paramID}`)
//         .send({ author_name: "William Shakespare", author_email: "WilliamShakes10@gmail.com", book_title: "She stoops to Conquer"})
//         .expect(200);
      

//     })
// })

// describe('DELETE deleteBook/:id', ()=>{
//     it('should delete a book by it"s id', ()=>{
//         const ParamID = 2;
//         request(app)
//         .delete(`/api/books/deleteBook/${ParamID}`)
//         .expect(200);
      
        
//     })
// })