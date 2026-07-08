import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: 'https://deepsynth-api.local',
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    tokenSigningAlg: 'RS256'
});

export default jwtCheck;