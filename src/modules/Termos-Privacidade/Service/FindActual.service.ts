import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { TermoPrivacidade } from '../Entitie/TermoPrivacidade';
import { ITermoPrivacidadeRepository } from '../Repository/ITermoPrivacidade.repository';

@injectable()
class FindActualService {
  constructor(
    @inject('TermoPrivacidadeRepository')
    private termoRepository: ITermoPrivacidadeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<TermoPrivacidade> {
    const today = new Date();

    const termo = await this.termoRepository.findActual(today);

    if (!termo) {
      throw new EntityNotFoundError('Termo de privacidade não encontrado');
    }

    const user = await this.userRepository.findBy({ usu_Id: termo.tpr_usu_id });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    Object.assign(termo, { user });

    return termo;
  }
}

export { FindActualService };
