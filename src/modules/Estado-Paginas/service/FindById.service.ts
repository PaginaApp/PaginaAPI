import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { EstadoPaginas } from '../entitie/EstadoPaginas';
import { IEstadoPaginasRepository } from '../repository/IEstadoPaginaRepository.interface';

@injectable()
class FindByIdService {
  constructor(
    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,
  ) {}

  async execute(epg_Id: string): Promise<EstadoPaginas> {
    const estadoPagina = await this.estadoPaginasRepository.findBy({ epg_Id });

    if (!estadoPagina) {
      throw new EntityNotFoundError('Estado da Página não encontrado');
    }

    return estadoPagina;
  }
}

export { FindByIdService };
