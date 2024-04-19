import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class ListExemplarByUserService {
  constructor(
    @inject('UserRepository')
    private userRespository: IUserRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<Exemplar>,
  ): Promise<IPaginatedResponse<Exemplar>> {
    if (!data.filter || !data.filter.exe_usu_id) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const user = this.userRespository.findBy({
      usu_Id: data.filter.exe_usu_id,
    });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const exemplares = await this.exemplarRepository.listBy({
      filter: data.filter,
      limit: data.limit,
      page: data.page,
    });

    const estadoCapa = await this.estadoCapaRepository.listBy({
      filter: {},
      limit: 100,
      page: 1,
    });

    const estadoPaginas = await this.estadoPaginasRepository.listBy({
      filter: {},
      limit: 100,
      page: 1,
    });

    // inclui os estados de capa e paginas no exemplar
    exemplares.results = exemplares.results.map((exemplar) => {
      Object.assign(exemplar, {
        estadoCapa: estadoCapa.results.find(
          (estado) => estado.ecp_Id === exemplar.exe_ecp_id,
        ),
      });

      Object.assign(exemplar, {
        estadoPaginas: estadoPaginas.results.find(
          (estado) => estado.epg_Id === exemplar.exe_epg_id,
        ),
      });

      return exemplar;
    });

    return exemplares;
  }
}

export { ListExemplarByUserService };
