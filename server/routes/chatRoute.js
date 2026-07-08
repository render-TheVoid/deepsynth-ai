import { Router } from 'express';
import chatWithAI from '../controllers/chatController.js';
import rateLimit from 'express-rate-limit';
import jwtCheck from '../services/auth0.js';

router.post(
    '/',
    rateLimit,
    jwtCheck,
    chatWithAI
);

export default router;