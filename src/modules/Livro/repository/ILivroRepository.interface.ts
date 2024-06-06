import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IRepository } from '@shared/interfaces/Repository';
import { ICreateLivroDTO } from '../DTO/ICreateLivroDTO';
import { IUpdateLivroDTO } from '../DTO/IUpdateLivroDTO';
import Livro from '../entitie/Livro';

interface ILivroRepository
  extends IRepository<Livro, ICreateLivroDTO, IUpdateLivroDTO> {
  listByTitulo(
    data: IPaginatedRequest<Livro>,
  ): Promise<IPaginatedResponse<Livro>>;
}

export { ILivroRepository };
