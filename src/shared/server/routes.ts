import { livroRoutes } from '@modules/Livro/routes/Livro.routes';
import { papelRoutes } from '@modules/Papel/routes/Papel.routes';
import { sessionRouter } from '@modules/User/routes/Session.routes';
import { userRouter } from '@modules/User/routes/User.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);

routes.use('/papel', papelRoutes);

routes.use('/session', sessionRouter);

routes.use('/livro', livroRoutes);

routes.get('/', (request, response) => {
  response.send('Bem Vindo ao API rest da plataforma Página 📚🚀🚀🚀');
});

export { routes };
