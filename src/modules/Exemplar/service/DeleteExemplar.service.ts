import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class DeleteExemplarService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('UserRepository')
    private userRespository: IUserRepository,
  ) {}

  async execute(exe_Id: string): Promise<void> {
    const exemplarExists = await this.exemplarRepository.findBy({
      exe_Id,
    });

    if (!exemplarExists) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    // adicionar verificação de transação
    await this.exemplarRepository.delete(exemplarExists);
  }
}

export { DeleteExemplarService };
