import { userRouter } from '@modules/User/routes/User.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);

routes.get('/', (request, response) => {
  response.send('Bem Vindo ao API rest da plataforma Página 📚🚀🚀🚀');
});

export { routes };
