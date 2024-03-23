import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { Autor } from '../entitie/Autor';

interface IAtorRepository extends IBasicRepository<Autor> {}

export { IAtorRepository };
