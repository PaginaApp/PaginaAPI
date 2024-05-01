import { inject, injectable } from 'tsyringe';
import { TipoTransacao } from '../entitie/TipoTransacao';
import { ITipoTransacaoRepository } from '../repository/TipoTransacaoRepository.interface';

@injectable()
class ListTipoTransacaoService {
  constructor(
    @inject('TipoTransacaoRepository')
    private tipoTransacaoRepository: ITipoTransacaoRepository,
  ) {}

  async execute(): Promise<TipoTransacao[]> {
    const tipoTransacoes = await this.tipoTransacaoRepository.listBy({});

    return tipoTransacoes.results;
  }
}

export { ListTipoTransacaoService };
