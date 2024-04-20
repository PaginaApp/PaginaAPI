import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { UnknownError } from '@shared/errors/UnknownError';
import { inject, injectable } from 'tsyringe';
import { CreateTransacaoDTO } from '../DTO/CreateTransacaoDTO';
import { Transacao } from '../entitie/Transacao';
import { ITransacaoRepository } from '../repository/TransacaoRepository.interface';

@injectable()
class CreateTransacaoService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('TipoTransacaoRepository')
    private tipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,
  ) {}

  async execute(data: CreateTransacaoDTO): Promise<Transacao> {
    // Verifica se os dados passados são válidos
    const leitor = await this.userRepository.findBy({
      usu_Id: data.trs_usu_Leitor_id,
    });

    if (!leitor) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const anunciante = await this.userRepository.findBy({
      usu_Id: data.trs_usu_Anunciante_id,
    });

    if (!anunciante) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const exemplarPrincipal = await this.exemplarRepository.findBy({
      exe_Id: data.exe_Principal_id,
    });

    if (!exemplarPrincipal) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    if (data.exe_Secundario_id) {
      const exemplarSecundario = await this.exemplarRepository.findBy({
        exe_Id: data.exe_Secundario_id,
      });

      if (!exemplarSecundario) {
        throw new EntityNotFoundError('Exemplar não encontrado');
      }
    }

    const tipoTransacao = await this.tipoTransacaoRepository.findBy({
      ttr_Id: data.trs_ttr_id,
    });

    if (!tipoTransacao) {
      throw new EntityNotFoundError('Tipo de transação não encontrado');
    }

    const statusTransacao = await this.statusTransacaoRepository.findBy({
      str_Id: data.trs_str_id,
    });

    if (!statusTransacao) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    // fim da verificação

    // criação da transação

    const transacao = await this.transacaoRepository.create({
      trs_str_id: statusTransacao.str_Id,
      trs_ttr_id: tipoTransacao.ttr_Id,
      trs_Data: data.trs_Data,
      trs_usu_Anunciante_id: anunciante.usu_Id,
      trs_usu_Leitor_id: leitor.usu_Id,
      trs_Prazo: data.trs_Prazo,
      trs_Preco: data.trs_Preco,
      exe_Principal_id: exemplarPrincipal.exe_Id,
      exe_Secundario_id: data.exe_Secundario_id,
    });

    if (!transacao) {
      throw new UnknownError('Erro ao criar transação');
    }

    // cria associacao com exemplar
    await this.exemplarTransacaoRepository.create({
      trs_id: transacao.trs_Id,
      exe_id: exemplarPrincipal.exe_Id,
    });

    if (data.exe_Secundario_id) {
      await this.exemplarTransacaoRepository.create({
        trs_id: transacao.trs_Id,
        exe_id: data.exe_Secundario_id,
      });
    }

    // adiciona exemplar principal e se existir secundario a transação
    Object.assign(transacao, {
      exe_Principal: exemplarPrincipal,
      exe_Secundario: data.exe_Secundario_id
        ? await this.exemplarRepository.findBy({
            exe_Id: data.exe_Secundario_id,
          })
        : null,
    });

    // retorna a transação
    return transacao;
  }
}

export { CreateTransacaoService };
