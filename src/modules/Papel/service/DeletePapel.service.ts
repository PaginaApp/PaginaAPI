import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IPapelRepository } from '../repository/IPapelRepository.interface';

@injectable()
class DeletePapel {
  constructor(
    @inject('PapelRepository')
    private papelRepository: IPapelRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(pap_Id: string): Promise<void> {
    const papelExists = await this.papelRepository.findBy({ pap_Id });

    if (!papelExists) {
      throw new EntityNotFoundError('Papel não encontrado');
    }

    const users = await this.userRepository.listBy({
      filter: { usu_pap_id: pap_Id },
    });

    if (users.results.length > 0) {
      throw new EntityNotFoundError('Existem usuários vinculados a este papel');
    }

    await this.papelRepository.delete(papelExists);
  }
}

export { DeletePapel };
