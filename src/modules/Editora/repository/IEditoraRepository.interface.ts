import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateEditoraDTO } from '../DTO/CreateEditoraDTO';
import { Editora } from '../entitie/Editora';

interface IEditoraRepository extends IBasicRepository<Editora> {
  create(entity: CreateEditoraDTO): Promise<Editora>;
  delete(entity: Editora): Promise<void>;
  listByName(
    data: IPaginatedRequest<Editora>,
  ): Promise<IPaginatedResponse<Editora>>;
}

export { IEditoraRepository };
