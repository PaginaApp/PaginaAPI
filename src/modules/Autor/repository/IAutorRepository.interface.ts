import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { Autor } from '../entitie/Autor';

interface IAutorRepository extends IBasicRepository<Autor> {}

export { IAutorRepository };
