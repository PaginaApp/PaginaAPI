import { IRepository } from '@shared/interfaces/Repository';
import { CreateLivroDTO } from '../DTO/ICreateLivroDTO';
import { UpdateLivroDTO } from '../DTO/IUpdateLivroDTO';
import Livro from '../entitie/Livro';

interface ILivroRepository
  extends IRepository<Livro, CreateLivroDTO, UpdateLivroDTO> {}

export { ILivroRepository };
