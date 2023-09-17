let db = require('../db/connection');
const {ParameterizedQuery : PQ} = require('pg-promise');

/* Using Parameterized Query */
const findbook = (req, res, next)=>{
    const paramID = parseInt(req.params.id);
  const query =  new PQ({ text : "SELECT * FROM booktb WHERE ID = $1 ", values:[
  paramID
    ]});

    db.any(query).then((row)=>{
        if(row[0]==null){
            return res.status(404).json({
                error: "true",
                message: "book not found"
            })
        }else{
            res.status(200).json({
                sucess: true,
                data: row,
                message: "data succesfully retrieved"
            })
        }
    
    }).catch((err)=>{
        return next(err);
    })

}

const addBook = (req, res, next)=>{
    const query = new PQ({ text: "INSERT INTO booktb(author_name, author_email, book_title) VALUES($1, $2, $3) ", values:[
        req.body.author_name,
        req.body.author_email,
        req.body.book_title
    ]})
    db.none(query).then(()=>{
        return res.status(201).json({
            succes: "true",
            message: "book suceesfully added"
        })
    }).catch((err)=>{
        return next(err);
    })
    
}


const getBooks = (req, res, next)=>{
    const query = new PQ({ text : "SELECT * FROM booktb"});
    db.any(query).then((row)=>{
       if(row[0]==null){
        res.status(404).json({
            error : "true",
            message : "no books found"
        })
       }else{
        res.status(200).json({
            succes: "true",
            data: row,
            message: "books succesfully retrieved"
        })
       }
    }).catch((err)=>{
        return next(err);
    })
}


const updateBook = (req, res, next)=>{
    const paramID = parseInt(req.params.id);
    const query = new PQ({ text : "UPDATE  booktb SET author_name = $1, author_email = $2, book_title = $3 WHERE ID = $4", values:[
        req.body.author_name,
        req.body.author_email,
        req.body.book_title,
        paramID
    ]})

    db.result(query).then((row)=>{
        if(row.rowCount===1){
            res.status(200).json({
                sucesss: "true",
                message: "book was succesfully updated"
            })
        }else{
            res.status(404).json({
                error: "true",
                message: "book not found"
            })
        }
    }).catch((err)=>{
        return next(err);
    })
}


const deleteBook = (req, res, next)=>{
    const paramID = parseInt(req.params.id);
    const query = new PQ({ text : "DELETE FROM booktb WHERE ID=$1", values:[
     paramID
    ]})

    db.result(query).then((row)=>{
        if(row.rowCount===1){
            res.status(200).json({
                sucesss: "true",
                message: "book was succesfully deleted"
            })
        }else{
            res.status(404).json({
                error: "true",
                message: "book not found"
            })
        }
      
    }).catch((err)=>{
        return next(err);

    })
}
module.exports = {
    findbook,
    addBook,
    getBooks,
    updateBook,
    deleteBook

}