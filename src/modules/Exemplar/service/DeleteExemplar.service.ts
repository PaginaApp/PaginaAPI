import { EntityUsedError } from '@shared/errors/EntitieUsedError';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class DeleteExemplarService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,
  ) {}

  async execute(exe_Id: string): Promise<void> {
    const exemplarExists = await this.exemplarRepository.findBy({
      exe_Id,
    });

    if (!exemplarExists) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    try {
      await this.exemplarRepository.delete(exemplarExists);
    } catch (error) {
      throw new EntityUsedError(
        'Exemplar já utilizado em uma transação impossível deletar',
      );
    }
  }
}

export { DeleteExemplarService };
