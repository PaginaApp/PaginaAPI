import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import '@shared/container';

import { globalErrorHandler } from '@shared/middlewares/GlobalErrorHandler';
import { routes } from './routes';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors());

app.use(json());

app.use(routes);

app.use(globalErrorHandler);

export { app };
