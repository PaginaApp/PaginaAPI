import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { inject, injectable } from 'tsyringe';
import { RelatorioMensalResponseDTO } from '../DTO/RelatorioMensalResponseDTO';
import { Relatorio } from '../entitie/Relatorio';

@injectable()
class ExemplarPorMesService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,
  ) {}

  async execute(
    ano: number,
  ): Promise<Relatorio<RelatorioMensalResponseDTO<number>>> {
    const anoDate = new Date(ano, 0, 1);
    const promises = [];

    for (let i = 0; i < 12; i += 1) {
      const mes = new Date(anoDate.setMonth(i));
      promises.push(
        this.exemplarRepository.countByMonth(mes.getMonth(), mes.getFullYear()),
      );
    }

    const exemplares = await Promise.all(promises);

    const data = {
      Ano: ano,
      Janeiro: exemplares[0],
      Fevereiro: exemplares[1],
      Marco: exemplares[2],
      Abril: exemplares[3],
      Maio: exemplares[4],
      Junho: exemplares[5],
      Julho: exemplares[6],
      Agosto: exemplares[7],
      Setembro: exemplares[8],
      Outubro: exemplares[9],
      Novembro: exemplares[10],
      Dezembro: exemplares[11],
    };

    return {
      data,
      generatedAt: new Date(),
    };
  }
}

export { ExemplarPorMesService };
