import { IRepository } from '@shared/interfaces/Repository';
import { CreateLivroDTO } from '../DTO/CreateLivroDTO';
import { UpdateLivroDTO } from '../DTO/UpdateLivroDTO';
import Livro from '../entitie/Livro';

interface ILivroRepository
  extends IRepository<Livro, CreateLivroDTO, UpdateLivroDTO> {}

export { ILivroRepository };
