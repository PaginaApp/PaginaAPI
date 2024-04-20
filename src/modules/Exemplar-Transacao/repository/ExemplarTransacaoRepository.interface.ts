import { IRepository } from '@shared/interfaces/Repository';
import { CreateExemplarTransacaoDTO } from '../DTO/CreateExemplarTransacaoDTO';
import { ExemplarTransacao } from '../entitie/ExemplarTransacao';

interface IExemplarTransacaoRepository
  extends IRepository<ExemplarTransacao, CreateExemplarTransacaoDTO, null> {}

export { IExemplarTransacaoRepository };
