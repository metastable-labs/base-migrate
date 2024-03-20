import { Router } from 'express';
import { authControllerInstance } from '../controllers/auth';

const router = Router();

router.get(
  '/github',
  authControllerInstance.githubCallback.bind(authControllerInstance)
);

export default router;
