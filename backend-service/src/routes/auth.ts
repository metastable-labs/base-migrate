import { Router } from 'express';
import { authControllerInstance } from '../controllers/auth';

const router = Router();

router.get(
  '/github',
  authControllerInstance.githubAuth.bind(authControllerInstance)
);

router.get(
  '/session',
  authControllerInstance.getSession.bind(authControllerInstance)
);

export default router;
