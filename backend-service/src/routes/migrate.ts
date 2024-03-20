import { Router } from 'express';
import { migrateControllerInstance } from '../controllers/migrate';

const router = Router();

router.post(
  '/token',
  migrateControllerInstance.migrateToken.bind(migrateControllerInstance)
);

export default router;
