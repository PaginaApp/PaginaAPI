import { IRepository } from '@shared/interfaces/Repository';
import { CreateListaDeDesejoDTO } from '../DTO/CreateListaDeDesejoDTO';
import { ListaDeDesejo } from '../entitie/ListaDeDesejo';

interface IListaDeDesejoRepository
  extends IRepository<ListaDeDesejo, CreateListaDeDesejoDTO, null> {}

export { IListaDeDesejoRepository };
