import { Router } from 'express';

import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// router.get('/google', googleOAuthLogin);
// router.get('/me', me);

export default router;
