import { inject, injectable } from 'tsyringe';
import { EstadoCapa } from '../entitie/EstadoCapa';
import { IEstadoCapaRepository } from '../repository/IEstadoCapaRepository.interface';

@injectable()
class ListAll {
  constructor(
    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,
  ) {}

  async execute(): Promise<EstadoCapa[]> {
    const data = await this.estadoCapaRepository.listBy({});

    return data.results;
  }
}

export { ListAll };
