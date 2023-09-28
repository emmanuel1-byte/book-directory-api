const express = require('express');
const middleware = require('../middleware/index')
const verifyUsername = middleware.verifyUsername
const router = express.Router();
const index = require('../controller/index');
const main = index.main;
const signup = index.Signup;
const signin = index.signin;
const signout = index.signout



/* Authentication */
router.get('/', main);

router.post('/api/v1/auth/signin',  signin);

router.post('/api/v1/auth/signup', verifyUsername , signup);

router.post('/api/v1/auth/signout', signout);

module.exports = router;