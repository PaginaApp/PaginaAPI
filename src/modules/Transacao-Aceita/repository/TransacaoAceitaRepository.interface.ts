import { IRepository } from '@shared/interfaces/Repository';
import { CreateTransacaoAceitaDTO } from '../DTO/CreateTransacaoAceitaDTO';
import { TransacaoAceita } from '../entitie/TransacaoAceita';

interface ITransacaoAceitaRepository
  extends IRepository<TransacaoAceita, CreateTransacaoAceitaDTO, null> {}

export { ITransacaoAceitaRepository };
