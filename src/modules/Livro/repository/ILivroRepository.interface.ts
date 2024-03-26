import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import Livro from '../entitie/Livro';

interface ILivroRepository extends IBasicRepository<Livro> {}

export { ILivroRepository };
