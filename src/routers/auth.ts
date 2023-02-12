import { Router } from 'express';
import authorization from '@/middleware/authorization';
import { signUpController, signInController, verifyController } from '@/controllers/auth';

const router = Router();

router.post('/sign-up', signUpController);

router.post('sign-in', signInController);

router.get('/verify', authorization, verifyController);

export default router;
