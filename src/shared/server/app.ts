import express, { json } from 'express';

import { globalErrorHandler } from '@shared/middlewares/GlobalErrorHandler';
import { routes } from './routes';

const app = express();

app.use(json());

app.use(routes);

app.use(globalErrorHandler);

export { app };
