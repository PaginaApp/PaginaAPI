import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class FindExemplarByIdService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,
  ) {}

  async execute(exe_Id: string): Promise<Exemplar> {
    const exemplar = await this.exemplarRepository.findBy({
      exe_Id,
    });

    if (!exemplar) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    const estadoCapa = await this.estadoCapaRepository.findBy({
      ecp_Id: exemplar.exe_ecp_id,
    });

    if (!estadoCapa) {
      throw new EntityNotFoundError('Estado da capa não encontrado');
    }

    const estadoPaginas = await this.estadoPaginasRepository.findBy({
      epg_Id: exemplar.exe_epg_id,
    });

    if (!estadoPaginas) {
      throw new EntityNotFoundError('Estado das páginas não encontrado');
    }

    Object.assign(exemplar, {
      estadoCapa,
      estadoPaginas,
    });

    return exemplar;
  }
}

export { FindExemplarByIdService };
