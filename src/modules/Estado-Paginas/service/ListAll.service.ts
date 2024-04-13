import { inject, injectable } from 'tsyringe';
import { EstadoPaginas } from '../entitie/EstadoPaginas';
import { IEstadoPaginasRepository } from '../repository/IEstadoPaginaRepository.interface';

@injectable()
class ListAllService {
  constructor(
    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,
  ) {}

  async execute(): Promise<EstadoPaginas[]> {
    const estadoPaginas = await this.estadoPaginasRepository.listBy({});

    return estadoPaginas.results;
  }
}

export { ListAllService };
