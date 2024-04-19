import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { EstadoCapa } from '../entitie/EstadoCapa';
import { IEstadoCapaRepository } from '../repository/IEstadoCapaRepository.interface';

@injectable()
class FindById {
  constructor(
    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,
  ) {}

  async execute(id: string): Promise<EstadoCapa> {
    const data = await this.estadoCapaRepository.findBy({ ecp_Id: id });

    if (!data) {
      throw new EntityNotFoundError('Estado da Capa não encontrado');
    }

    return data;
  }
}

export { FindById };
