import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateAutorDTO } from '../DTO/CreateAutorDTO';
import { Autor } from '../entitie/Autor';

interface IAutorRepository extends IBasicRepository<Autor> {
  create(entity: CreateAutorDTO): Promise<Autor>;
  delete(entity: Autor): Promise<void>;
  listByName(
    data: IPaginatedRequest<Autor>,
  ): Promise<IPaginatedResponse<Autor>>;
}

export { IAutorRepository };
