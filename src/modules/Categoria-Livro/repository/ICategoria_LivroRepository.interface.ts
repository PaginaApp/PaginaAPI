import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { CategoriaLivro } from '../entitie/CategoriaLivro';

interface ICategoriaLivroRepository extends IBasicRepository<CategoriaLivro> {
  create(data: { cat_Id: string; liv_Id: string }): Promise<CategoriaLivro>;
  delete(data: { cat_Id: string; liv_Id: string }): Promise<void>;
}

export { ICategoriaLivroRepository };
