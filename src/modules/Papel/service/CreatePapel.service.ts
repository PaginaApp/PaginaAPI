import { EntityAlreadyExistError } from '@shared/errors/EntityAlreadyExistError';
import { inject, injectable } from 'tsyringe';
import { Papel } from '../entity/Papel';
import { IPapelRepository } from '../repository/IPapelRepository.interface';

@injectable()
class CreatePapel {
  constructor(
    @inject('PapelRepository')
    private papelRepository: IPapelRepository,
  ) {}

  async execute(pap_Nome: string): Promise<Papel> {
    const papelAlreadyExists = await this.papelRepository.findBy({
      pap_Nome,
    });

    if (papelAlreadyExists) {
      throw new EntityAlreadyExistError('Papel já existe, tente outro nome!!!');
    }

    const papel = await this.papelRepository.create({
      pap_Nome,
    });

    return papel;
  }
}

export { CreatePapel };
