import { IRepository } from '@shared/interfaces/Repository';
import { CreateExemplarDTO } from '../DTO/CreateExemplarDTO';
import { UpdateExemplarDTO } from '../DTO/UpdateExemplarDTO';
import { Exemplar } from '../entitie/Exemplar';

interface IExemplarRepository
  extends IRepository<Exemplar, CreateExemplarDTO, UpdateExemplarDTO> {
  countByMonth(month: number, year: number): Promise<number>;
}

export { IExemplarRepository };
