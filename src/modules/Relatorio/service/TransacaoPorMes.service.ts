import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { ITransacaoRepository } from '@modules/Transacao/repository/TransacaoRepository.interface';
import { inject, injectable } from 'tsyringe';
import { RelatorioMensalResponseDTO } from '../DTO/RelatorioMensalResponseDTO';
import { TiposTransacaoDTO } from '../DTO/TiposTransacaoDTO';
import { Relatorio } from '../entitie/Relatorio';

@injectable()
class TransacaoPorMesService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('TipoTransacaoRepository')
    private tiposTransacaoRepository: ITipoTransacaoRepository,
  ) {}

  async execute(
    ano: number,
  ): Promise<Relatorio<RelatorioMensalResponseDTO<TiposTransacaoDTO>>> {
    const tiposTransacao = await this.tiposTransacaoRepository.listBy({
      page: 1,
      limit: 100,
      filter: {},
    });

    const formatedData: RelatorioMensalResponseDTO<TiposTransacaoDTO> = {
      Ano: ano,
      Janeiro: new TiposTransacaoDTO(),
      Fevereiro: new TiposTransacaoDTO(),
      Marco: new TiposTransacaoDTO(),
      Abril: new TiposTransacaoDTO(),
      Maio: new TiposTransacaoDTO(),
      Junho: new TiposTransacaoDTO(),
      Julho: new TiposTransacaoDTO(),
      Agosto: new TiposTransacaoDTO(),
      Setembro: new TiposTransacaoDTO(),
      Outubro: new TiposTransacaoDTO(),
      Novembro: new TiposTransacaoDTO(),
      Dezembro: new TiposTransacaoDTO(),
    };
    for (let i = 1; i < 12; i += 1) {
      const tipoTransacaoDTO = new TiposTransacaoDTO();
      // eslint-disable-next-line no-restricted-syntax
      for (const tipo of tiposTransacao.results) {
        const startDate = new Date(ano, i - 1, 1);
        const endDate = new Date(ano, i, 0);
        // eslint-disable-next-line no-await-in-loop
        const transacoes = await this.transacaoRepository.countByDateByType(
          startDate,
          endDate,
          tipo.ttr_Id,
        );
        switch (tipo.ttr_Nome) {
          case 'Emprestimo':
            tipoTransacaoDTO.emprestimo = transacoes;
            break;
          case 'Venda':
            tipoTransacaoDTO.venda = transacoes;
            break;
          case 'Doação':
            tipoTransacaoDTO.doacao = transacoes;
            break;
          case 'Troca':
            tipoTransacaoDTO.troca = transacoes;
            break;
          default:
            break;
        }
      }
      switch (i) {
        case 1:
          formatedData.Janeiro = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 2:
          formatedData.Fevereiro = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 3:
          formatedData.Marco = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 4:
          formatedData.Abril = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 5:
          formatedData.Maio = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 6:
          formatedData.Junho = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 7:
          formatedData.Julho = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 8:
          formatedData.Agosto = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 9:
          formatedData.Setembro = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 10:
          formatedData.Outubro = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 11:
          formatedData.Novembro = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        case 12:
          formatedData.Dezembro = {
            doacao: tipoTransacaoDTO.doacao,
            emprestimo: tipoTransacaoDTO.emprestimo,
            troca: tipoTransacaoDTO.troca,
            venda: tipoTransacaoDTO.venda,
          };
          break;
        default:
          break;
      }
    }

    return {
      data: formatedData,
      generatedAt: new Date(),
    };
  }
}
export { TransacaoPorMesService };
