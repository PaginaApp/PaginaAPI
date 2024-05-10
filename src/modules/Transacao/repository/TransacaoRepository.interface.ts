import { IRepository } from '@shared/interfaces/Repository';
import { CreateTransacaoDTO } from '../DTO/CreateTransacaoDTO';
import { UpdateTransacaoDTO } from '../DTO/UpdateTransacaoDTO';
import { Transacao } from '../entitie/Transacao';

interface ITransacaoRepository
  extends IRepository<Transacao, CreateTransacaoDTO, UpdateTransacaoDTO> {
  countByDateByType(
    startDate: Date,
    endDate: Date,
    trs_ttr_id: string,
  ): Promise<number>;
}

export { ITransacaoRepository };
