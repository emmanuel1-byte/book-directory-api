const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db/connection');
const { ParameterizedQuery : PQ } = require('pg-promise');


const main = (req, res)=>{
    res.json("Book Api is running....")
}


const signUp = function (req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) {
            return next(err);
        }
        const query = new PQ({
            text: 'INSERT INTO Usertb(firstname, lastname, username, password, salt) 	VALUES ($1, $2, $3, $4, $5)', values: [
                req.body.firstname,
                req.body.lastname,
                req.body.username,
                hashedPassword,
                salt

            ],
        });
   
        db.none(query).then(() => {
            var user = {
                id: this.lastID,
                username: req.body.username
              };

          return  req.login(user, function(err) {
                if (err) { return next(err); }
                return res.status(201).json({
                    sucess: "true",
                    message: "user signup was succesfull"
                })
              });
        })
            .catch((err) => {
                return next(err);
            })
    })


}



/* setting the user id and username into session */
passport.serializeUser(function(user, cb){
    process.nextTick(
        function(){
            cb(null, { id : user.id, username : user.username});

        }
    )
});

/* getting the user Object  from the session */
passport.deserializeUser(function(user, cb){
    process.nextTick(function(){
        return cb(null, user);
    })

})


//used a Local strategy
passport.use(new LocalStrategy(function verify(username, password, cb){
    const query = new PQ({ text : "SELECT * FROM usertb WHERE username = $1", values:[username]})
    db.any(query).then((row)=>{
        if(!row[0]){ 
            return cb(null, false);
        }
        crypto.pbkdf2(password, row[0].salt , 310000, 32, 'sha256', function(err, hashedPassword){
            if(err){return cb(err)};
            if(!crypto.timingSafeEqual(row[0].password, hashedPassword)){ return cb(null, false)}
            return cb(null, row)
        })
      
    }).catch((err)=>{
        return next(err);
    });
}))



const userLogin = function(req, res, next){
    passport.authenticate('local', function(err, user, info, status) {
        if (err) { return next(err) }
        if (!user) { return res.status(404).json({
            error: "true",
            reason : "incorrect username or password"
        }) }
        res.status(200).json({
            sucess: "true",
            message:"Login was sucesfull"
        });
      })(req, res, next);
  
    
}


    
  

const userLogout = (req, res, next)=>{
     req.logout(function(err){
        if(err){
            return next(err);
        }
})
return res.status(200).json({
    succes : true,
    message : "user logged out"
})
}
 

module.exports = {
    main: main,
    Register : signUp,
    Login : userLogin,
    Logout : userLogout,
}