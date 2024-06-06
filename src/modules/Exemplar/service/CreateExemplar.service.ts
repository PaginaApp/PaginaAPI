import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { ITransacaoAceitaRepository } from '@modules/Transacao-Aceita/repository/TransacaoAceitaRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { BadRequestError } from '@shared/errors/BadRequestError';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { CreateExemplarDTO } from '../DTO/CreateExemplarDTO';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class CreateExemplarService {
  constructor(
    @inject('UserRepository')
    private userRespository: IUserRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('TipoTransacaoRepository')
    private TipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('TransacaoAceitaRepository')
    private transacaoAceitaRepository: ITransacaoAceitaRepository,
  ) {}

  async execute(
    data: CreateExemplarDTO,
    exe_trs_id: string[],
  ): Promise<Exemplar> {
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

    // verificação de tipos de transações aceitas
    await Promise.all(
      exe_trs_id.map(async (transacao) => {
        const transacaoFind = await this.TipoTransacaoRepository.findBy({
          ttr_Id: transacao,
        });

        if (!transacaoFind) {
          throw new EntityNotFoundError('Tipo de transação não encontrado');
        }

        if (transacaoFind.ttr_Nome === 'Venda' && !data.exe_Preco) {
          throw new BadRequestError('Preço esperado não enviado');
        }

        if (transacaoFind.ttr_Nome === 'Emprestimo' && !data.exe_Prazo) {
          throw new BadRequestError('Prazo de empréstimo não informado');
        }
      }),
    );

    const exemplar = await this.exemplarRepository.create(data);

    // adiciona as transacoes aceitas ao exemplar

    exe_trs_id.forEach(async (tipoTransacao) => {
      await this.transacaoAceitaRepository.create({
        exe_Id: exemplar.exe_Id,
        ttr_Id: tipoTransacao,
      });
    });

    const tiposTransacoesPromises = exe_trs_id.map(async (transacao) => {
      const transacaoFind = await this.TipoTransacaoRepository.findBy({
        ttr_Id: transacao,
      });

      if (!transacaoFind) {
        throw new EntityNotFoundError('Tipo de transação não encontrado');
      }

      return transacaoFind;
    });

    const tiposTransacoes = await Promise.all(tiposTransacoesPromises);

    Object.assign(exemplar, { tiposTransacoes });

    return exemplar;
  }
}

export { CreateExemplarService };
