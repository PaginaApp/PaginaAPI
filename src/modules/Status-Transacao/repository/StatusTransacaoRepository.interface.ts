import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { StatusTransacao } from '../entitie/StatusTransacao';

interface IStatusTransacaoRepository
  extends IBasicRepository<StatusTransacao> {}

export { IStatusTransacaoRepository };
