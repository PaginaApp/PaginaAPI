import { Router } from 'express';
import { TermoPrivacidadeController } from '../Controller/TermoPrivacidade.controller';

const termoPrivacidadeRoutes = Router();

const termoPrivacidadeController = new TermoPrivacidadeController();

termoPrivacidadeRoutes.post('/', termoPrivacidadeController.create);

termoPrivacidadeRoutes.get('/', termoPrivacidadeController.findActual);

export { termoPrivacidadeRoutes };
