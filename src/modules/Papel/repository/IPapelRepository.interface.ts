import { IRepository } from '@shared/interfaces/Repository';
import { IcreatePapelDTO } from '../DTO/ICreatePapelDTO';
import { IUpdatePapelDTO } from '../DTO/IUpdatePapelDTO';
import { Papel } from '../entity/Papel';

interface IPapelRepository
  extends IRepository<Papel, IcreatePapelDTO, IUpdatePapelDTO> {}

export { IPapelRepository };
