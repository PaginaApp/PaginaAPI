import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { Categoria } from '../entitie/Categoria';

interface ICategoriaRepository extends IBasicRepository<Categoria> {}

export { ICategoriaRepository };
