import express from 'express';
import chatWithAI from '../controllers/chatController.js';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://deepsynth-api.local',
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    tokenSigningAlg: 'RS256'
});

router.post('/', jwtCheck, chatWithAI);

export default router;