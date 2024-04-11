import { inject, injectable } from 'tsyringe';
import { EstadoPaginas } from '../entitie/EstadoPaginas';
import { IEstadoPaginaRepository } from '../repository/IEstadoPaginaRepository.interface';

@injectable()
class ListAllService {
  constructor(
    @inject('EstadoPaginaRepository')
    private estadoPaginaRepository: IEstadoPaginaRepository,
  ) {}

  async execute(): Promise<EstadoPaginas[]> {
    const estadoPagina = await this.estadoPaginaRepository.listBy({});

    return estadoPagina.results;
  }
}

export { ListAllService };
