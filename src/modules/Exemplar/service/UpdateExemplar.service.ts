import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { UpdateExemplarDTO } from '../DTO/UpdateExemplarDTO';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class UpdateExemplarService {
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

  async execute(data: UpdateExemplarDTO): Promise<Exemplar> {
    const user = this.userRespository.findBy({
      usu_Id: data.exe_usu_id,
    });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado tente novamente');
    }

    const estadoCapa = await this.estadoCapaRepository.findBy({
      ecp_Id: data.exe_ecp_id,
    });

    if (!estadoCapa) {
      throw new EntityNotFoundError(
        'Estado da capa não encontrado tente novamente mais tarde',
      );
    }

    const estadoPaginas = await this.estadoPaginasRepository.findBy({
      epg_Id: data.exe_epg_id,
    });

    if (!estadoPaginas) {
      throw new EntityNotFoundError(
        'Estado das páginas não encontrado, tente novamente',
      );
    }

    const exemplarExists = await this.exemplarRepository.findBy({
      exe_Id: data.exe_Id,
    });

    if (!exemplarExists) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    const exemplar = await this.exemplarRepository.update(data);

    return exemplar;
  }
}

export { UpdateExemplarService };
