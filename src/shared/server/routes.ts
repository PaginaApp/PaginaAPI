import { autorRoutes } from '@modules/Autor/routes/Autor.routes';
import { categoriaRoutes } from '@modules/Categoria/routes/Categoria.routes';
import { editoraRoutes } from '@modules/Editora/routes/Editora.routes';
import { estadoCapaRoutes } from '@modules/Estado-Capa/routes/EstadoCapa.routes';
import { estadoPaginasRoutes } from '@modules/Estado-Paginas/routes/EstadoPaginas.routes';
import { exemplarRoutes } from '@modules/Exemplar/routes/Exemplar.routes';
import { livroRoutes } from '@modules/Livro/routes/Livro.routes';
import { papelRoutes } from '@modules/Papel/routes/Papel.routes';
import { relatorioRoutes } from '@modules/Relatorio/routes/Relatorio.routes';
import { tipoTransacoesRoutes } from '@modules/Tipo-Transacao/routes/TipoTransacao.routes';
import { transacaoRoutes } from '@modules/Transacao/routes/Transacao.routes';
import { sessionRouter } from '@modules/User/routes/Session.routes';
import { userRouter } from '@modules/User/routes/User.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);

routes.use('/papel', papelRoutes);

routes.use('/session', sessionRouter);

routes.use('/livro', livroRoutes);

routes.use('/categoria', categoriaRoutes);

routes.use('/estadoCapa', estadoCapaRoutes);

routes.use('/estadoPaginas', estadoPaginasRoutes);

routes.use('/exemplar', exemplarRoutes);

routes.use('/tipoTransacao', tipoTransacoesRoutes);

routes.use('/transacao', transacaoRoutes);

routes.use('/relatorio', relatorioRoutes);

routes.use('/editora', editoraRoutes);

routes.use('/autor', autorRoutes);

routes.get('/', (request, response) => {
  response.send('Bem Vindo ao API rest da plataforma Página 📚🚀🚀🚀');
});

export { routes };
