import { IRepository } from '@shared/interfaces/Repository';
import { CreateExemplarDTO } from '../DTO/CreateExemplarDTO';
import { UpdateExemplarDTO } from '../DTO/UpdateExemplarDTO';
import { Exemplar } from '../entitie/Exemplar';

interface IExemplarRepository
  extends IRepository<Exemplar, CreateExemplarDTO, UpdateExemplarDTO> {}

export { IExemplarRepository };
