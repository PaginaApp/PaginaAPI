import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IUpdatePapelDTO } from '../DTO/IUpdatePapelDTO';
import { Papel } from '../entity/Papel';
import { IPapelRepository } from '../repository/IPapelRepository.interface';

@injectable()
class UpdatePapel {
  constructor(
    @inject('PapelRepository')
    private papelRepository: IPapelRepository,
  ) {}

  async execute({ pap_Id, pap_Nome }: IUpdatePapelDTO): Promise<Papel> {
    const papelExists = await this.papelRepository.findBy({ pap_Id });

    if (!papelExists) {
      throw new EntityNotFoundError('Papel não encontrado');
    }

    const nameAlreadyExists = await this.papelRepository.findBy({ pap_Nome });

    if (nameAlreadyExists) {
      throw new EntityNotFoundError('Papel já existe, tente outro nome!!!');
    }

    const papel = await this.papelRepository.update({
      pap_Id,
      pap_Nome,
    });

    return papel;
  }
}

export { UpdatePapel };
