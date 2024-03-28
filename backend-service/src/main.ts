import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { env } from './common/config/env';
import routes from './routes';

(async () => {
  const app: Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(routes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('App error', { err, req, res });

    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error, please try again later.',
      error: err.message,
    });
  });

  process
    .on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at Promise', { reason, p });
    })
    .on('uncaughtException', (err) => {
      console.log('Uncaught Exception thrown', { err });
    });

  const PORT = process.env.PORT ?? env.app.port;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();
