import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.send('Bem Vindo ao API rest da plataforma Página 📚🚀🚀🚀');
});

export { routes };
