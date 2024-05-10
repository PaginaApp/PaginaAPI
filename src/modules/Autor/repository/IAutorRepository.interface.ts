import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { CreateAutorDTO } from '../DTO/CreateAutorDTO';
import { Autor } from '../entitie/Autor';

interface IAutorRepository extends IBasicRepository<Autor> {
  create(entity: CreateAutorDTO): Promise<Autor>;
  delete(entity: Autor): Promise<void>;
}

export { IAutorRepository };
