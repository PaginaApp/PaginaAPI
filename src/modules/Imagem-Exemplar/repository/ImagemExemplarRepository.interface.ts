import { IRepository } from '@shared/interfaces/Repository';
import { CreateImagemExemplarDTO } from '../DTO/CreateImagemExemplarDTO';
import { ImagemExemplar } from '../entitie/ImagemExemplar';

interface IImagemExemplarRepository
  extends IRepository<ImagemExemplar, CreateImagemExemplarDTO, null> {}

export { IImagemExemplarRepository };
