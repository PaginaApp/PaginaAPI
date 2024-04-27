import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { Exemplar } from '@modules/Exemplar/entitie/Exemplar';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { User } from '@modules/User/entity/User';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { Transacao } from '../entitie/Transacao';
import { ITransacaoRepository } from '../repository/TransacaoRepository.interface';

@injectable()
class ConcluirTransacaoService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,

    @inject('TipoTransacaoRepository')
    private tipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(trs_Id: string): Promise<Transacao> {
    const transacao = await this.transacaoRepository.findBy({
      trs_Id,
    });

    if (!transacao) {
      throw new EntityNotFoundError('Transação não encontrada');
    }

    const ExemplaresTransacao = await this.exemplarTransacaoRepository.listBy({
      filter: {
        trs_id: transacao.trs_Id,
      },
      page: 1,
      limit: 2,
    });

    const statusTransacao = await this.statusTransacaoRepository.findBy({
      str_Id: transacao.trs_str_id,
    });

    if (!statusTransacao) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    if (statusTransacao.str_Nome !== 'Em andamento') {
      throw new EntityNotFoundError('Transação não está em andamento');
    }

    const tipoTransacao = await this.tipoTransacaoRepository.findBy({
      ttr_Id: transacao.trs_ttr_id,
    });

    if (!tipoTransacao) {
      throw new EntityNotFoundError('Tipo de transação não encontrado');
    }

    if (tipoTransacao.ttr_Nome === 'Troca') {
      const users: User[] = [];
      const exemplares: Exemplar[] = [];
      const exemplaresPromises = ExemplaresTransacao.results.map(
        async (exemplarTransacao) => {
          const exemplar = await this.exemplarRepository.findBy({
            exe_Id: exemplarTransacao.exe_id,
          });

          if (!exemplar) {
            throw new EntityNotFoundError('Exemplar não encontrado');
          }

          const user = await this.userRepository.findBy({
            usu_Id: exemplar.exe_usu_id,
          });

          if (!user) {
            throw new EntityNotFoundError('Usuário não encontrado');
          }

          users.push(user);
          exemplares.push(exemplar);
        },
      );

      await Promise.all(exemplaresPromises);

      const user1 = users[0];
      const user2 = users[1];

      const exemplar1 = exemplares.find(
        (exemplar) => exemplar.exe_usu_id === user1.usu_Id,
      );

      const exemplar2 = exemplares.find(
        (exemplar) => exemplar.exe_usu_id === user2.usu_Id,
      );

      exemplar1!.exe_usu_id = user2.usu_Id;
      exemplar1!.exe_Negociando = false;

      exemplar2!.exe_usu_id = user1.usu_Id;
      exemplar2!.exe_Negociando = false;

      await this.exemplarRepository.update(exemplar1!);
      await this.exemplarRepository.update(exemplar2!);
    } else {
      const exemplaresPromises = ExemplaresTransacao.results.map(
        async (exemplarTransacao) => {
          const exemplar = await this.exemplarRepository.findBy({
            exe_Id: exemplarTransacao.exe_id,
          });

          if (!exemplar) {
            throw new EntityNotFoundError('Exemplar não encontrado');
          }

          exemplar.exe_Negociando = false;
          exemplar.exe_usu_id = transacao.trs_usu_Leitor_id;

          await this.exemplarRepository.update(exemplar);
        },
      );

      await Promise.all(exemplaresPromises);
    }

    const statusConcluida = await this.statusTransacaoRepository.findBy({
      str_Nome: 'Concluída',
    });

    if (!statusConcluida) {
      throw new EntityNotFoundError(
        'Status de transação não encontrado, erro nosso desculpe por isso',
      );
    }

    transacao.trs_str_id = statusConcluida.str_Id;

    await this.transacaoRepository.update(transacao);

    const exemplares = await this.exemplarTransacaoRepository.listBy({
      filter: {
        trs_id: transacao.trs_Id,
      },
      page: 1,
      limit: 2,
    });

    const exemplaresPromises = exemplares.results.map(
      async (exemplarTransacao) => {
        const exemplar = await this.exemplarRepository.findBy({
          exe_Id: exemplarTransacao.exe_id,
        });

        if (!exemplar) {
          throw new EntityNotFoundError('Exemplar não encontrado');
        }

        Object.assign(transacao, {
          exemplar,
        });
        return exemplar;
      },
    );

    await Promise.all(exemplaresPromises);

    return transacao;
  }
}

export { ConcluirTransacaoService };
