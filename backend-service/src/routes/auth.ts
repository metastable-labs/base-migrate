import { Router } from 'express';
import { authControllerInstance } from '../controllers/auth';

const router = Router();

router.get(
  '/github/callback',
  authControllerInstance.githubCallback.bind(authControllerInstance)
);

export default router;
