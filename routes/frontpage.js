const express = require('express');
const router = express.Router();
const frontpage = require('../controllers/frontpage');
const {verifyToken , checkGuestUser } = require('../middleware/auth');

router.get('/', frontpage.root);
router.post('/submit',verifyToken , checkGuestUser, frontpage.submittopics);

module.exports = router;