import { Router } from 'express';
import chatWithAI from '../controllers/chatController.js';
import rateLimit from '../middlewares/rateLimit.js';
import jwtCheck from '../services/auth0.js';

const router = Router();

router.post(
    '/',
    rateLimit,
    jwtCheck,
    chatWithAI
);

export default router;