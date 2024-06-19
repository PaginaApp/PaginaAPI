import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { CreateTermoPrivacidade } from '../DTO/CreateTermoPrivacidade';
import { TermoPrivacidade } from '../Entitie/TermoPrivacidade';
import { ITermoPrivacidadeRepository } from '../Repository/ITermoPrivacidade.repository';

@injectable()
class CreateTermoService {
  constructor(
    @inject('TermoPrivacidadeRepository')
    private termoRepository: ITermoPrivacidadeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(
    data: CreateTermoPrivacidade,
  ): Promise<TermoPrivacidade> {
    const user = await this.userRepository.findBy({ usu_Id: data.tpr_usu_id });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const termo = await this.termoRepository.create(data);

    return termo;
  }
}

export { CreateTermoService };
