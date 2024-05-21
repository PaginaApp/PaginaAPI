import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { TipoTransacao } from '@modules/Tipo-Transacao/entitie/TipoTransacao';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { ITransacaoAceitaRepository } from '@modules/Transacao-Aceita/repository/TransacaoAceitaRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { BadRequestError } from '@shared/errors/BadRequestError';
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

    @inject('TipoTransacaoRepository')
    private tipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('TransacaoAceitaRepository')
    private transacaoAceitaRepository: ITransacaoAceitaRepository,
  ) {}

  async execute(
    data: UpdateExemplarDTO,
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

    const exemplarExists = await this.exemplarRepository.findBy({
      exe_Id: data.exe_Id,
    });

    if (!exemplarExists) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    // remove todas as transações aceitas
    const tiposAceitos = await this.transacaoAceitaRepository.listBy({
      filter: {
        exe_Id: exemplarExists.exe_Id,
      },
    });

    const tiposAceitosPromises = tiposAceitos.results.map((tipoAceito) => {
      return this.transacaoAceitaRepository.delete(tipoAceito);
    });

    await Promise.all(tiposAceitosPromises);

    // verifica e cria novamente os tipos de transações passados
    const tiposAceitosCreatePromises = exe_trs_id.map(async (transacao) => {
      const transacaoFind = await this.tipoTransacaoRepository.findBy({
        ttr_Id: transacao,
      });

      if (!transacaoFind) {
        throw new EntityNotFoundError('Tipo de transação não encontrado');
      }

      if (transacaoFind.ttr_Nome === 'Emprestimo') {
        if (!exemplarExists.exe_Prazo && !data.exe_Prazo) {
          throw new BadRequestError('Prazo não encontrado');
        }
      }

      if (transacaoFind.ttr_Nome === 'Venda') {
        if (!exemplarExists.exe_Preco && !data.exe_Preco) {
          throw new BadRequestError('Preço não encontrado');
        }
      }
      return this.transacaoAceitaRepository.create({
        exe_Id: exemplarExists.exe_Id,
        ttr_Id: transacao,
      });
    });

    await Promise.all(tiposAceitosCreatePromises);

    const tiposTransacoes: TipoTransacao[] = [];
    await Promise.all(
      exe_trs_id.map(async (id) => {
        const tipoTransacao = await this.tipoTransacaoRepository.findBy({
          ttr_Id: id,
        });

        if (!tipoTransacao) {
          throw new EntityNotFoundError('Tipo de transação não encontrado');
        }

        tiposTransacoes.push(tipoTransacao);
        return tipoTransacao;
      }),
    );

    const exemplar = await this.exemplarRepository.update(data);

    Object.assign(exemplar, { tiposTransacoes });

    return exemplar;
  }
}

export { UpdateExemplarService };
