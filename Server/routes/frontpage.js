import express from 'express';
import {root, submittopics} from '../controllers/frontpage.js';
import {verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', root);
router.post('/submit',verifyToken , submittopics);

export default router;