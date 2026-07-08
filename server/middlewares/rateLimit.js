import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 20, // 20 requests per 10 min
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56,
    message: "Too many authentication requests, try again later."
});

export default rateLimit;