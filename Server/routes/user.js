import express from 'express';
import {creatuser, getuser, indexpage, remove, view, search, saveLanguage, logout} from '../controllers/user.js';
import {verifyToken} from '../middleware/auth.js';

const router = express.Router();



router.post('/signup', creatuser);

router.post('/signin', getuser);

router.get('/index',verifyToken,indexpage);

router.post('/remove',verifyToken, remove);

router.post('/view',verifyToken, view);

router.post('/search',verifyToken, search);

router.post('/save-language',verifyToken, saveLanguage);

router.get('/signout', logout);

export default router;