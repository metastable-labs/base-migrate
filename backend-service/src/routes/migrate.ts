import { Router } from 'express';
import { migrateControllerInstance } from '../controllers/migrate';

const router = Router();

router.post(
  '/token',
  migrateControllerInstance.migrateToken.bind(migrateControllerInstance)
);

router.get(
  '/',
  migrateControllerInstance.getMigrations.bind(migrateControllerInstance)
);

router.get(
  '/:address',
  migrateControllerInstance.getMigration.bind(migrateControllerInstance)
);



export default router;
