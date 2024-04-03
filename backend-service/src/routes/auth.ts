import { Router } from 'express';
import { authControllerInstance } from '../controllers/auth';

const router = Router();

router.get(
  '/github',
  authControllerInstance.githubAuth.bind(authControllerInstance)
);

router.get(
  '/github/permissions',
  authControllerInstance.getPermissions.bind(authControllerInstance)
);

router.get(
  '/session',
  authControllerInstance.getSession.bind(authControllerInstance)
);

router.delete(
  '/github/disconnect',
  authControllerInstance.disconnect.bind(authControllerInstance)
);

export default router;
