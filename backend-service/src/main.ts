import express, { Application } from 'express';
import cors from 'cors';
import { env } from './common/config/env';
import routes from './routes';

(async () => {
  const app: Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(routes);

  const PORT = process.env.PORT ?? env.app.port;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();
