const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const {verifyToken , checkGuestUser, } = require('../middleware/auth');


router.get('/signup', user.signuppage);
router.post('/signup', user.creatuser);

router.get('/signin', user.signinpage);
router.post('/signin', user.getuser);

router.get('/index',verifyToken, user.indexpage);

router.post('/remove',verifyToken, user.remove);

router.post('/view',verifyToken, user.view);

router.get('/search',verifyToken, user.search);

router.post('/save-language',verifyToken,checkGuestUser, user.saveLanguage);


router.get('/signout', user.logout);

module.exports = router;