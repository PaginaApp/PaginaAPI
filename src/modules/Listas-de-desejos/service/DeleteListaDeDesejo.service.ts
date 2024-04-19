import { inject, injectable } from 'tsyringe';
import { IListaDeDesejoRepository } from '../repository/ListaDeDesejoRepository.interface';

@injectable()
class DeleteListaDeDesejoService {
  constructor(
    @inject('ListaDeDesejoRepository')
    private listaDeDesejoRepository: IListaDeDesejoRepository,
  ) {}

  async execute(usu_Id: string, liv_Id: string): Promise<void> {
    const listaDeDesejo = await this.listaDeDesejoRepository.findBy({
      usu_id: usu_Id,
      liv_id: liv_Id,
    });

    if (!listaDeDesejo) {
      throw new Error('Lista de desejos não encontrada.');
    }

    await this.listaDeDesejoRepository.delete(listaDeDesejo);
  }
}

export { DeleteListaDeDesejoService };
