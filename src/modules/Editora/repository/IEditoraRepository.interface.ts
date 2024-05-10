import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { CreateEditoraDTO } from '../DTO/CreateEditoraDTO';
import { Editora } from '../entitie/Editora';

interface IEditoraRepository extends IBasicRepository<Editora> {
  create(entity: CreateEditoraDTO): Promise<Editora>;
  delete(entity: Editora): Promise<void>;
}

export { IEditoraRepository };
