import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { EstadoPaginas } from '../entitie/EstadoPaginas';
import { IEstadoPaginaRepository } from '../repository/IEstadoPaginaRepository.interface';

@injectable()
class FindByIdService {
  constructor(
    @inject('EstadoPaginaRepository')
    private estadoPaginaRepository: IEstadoPaginaRepository,
  ) {}

  async execute(epg_Id: string): Promise<EstadoPaginas> {
    const estadoPagina = await this.estadoPaginaRepository.findBy({ epg_Id });

    if (!estadoPagina) {
      throw new EntityNotFoundError('Estado da Página não encontrado');
    }

    return estadoPagina;
  }
}

export { FindByIdService };
