const express = require('express');
const {loginUser,
       addUser, 
       setUser,
       getAllUser} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/addUser', addUser);
router.post('/setUser', setUser);
router.post('/getAllUser', getAllUser);

module.exports = {
    routes: router
}