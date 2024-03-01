import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { Papel } from '../entity/Papel';
import { IPapelRepository } from '../repository/IPapelRepository.interface';

@injectable()
class FindPapelByIdService {
  constructor(
    @inject('PapelRepository')
    private papelRepository: IPapelRepository,
  ) {}

  public async execute(pap_Id: string): Promise<Papel> {
    const papel = await this.papelRepository.findBy({ pap_Id });

    if (!papel) {
      throw new EntityNotFoundError('Papel não encontrado');
    }

    return papel;
  }
}

export { FindPapelByIdService };
