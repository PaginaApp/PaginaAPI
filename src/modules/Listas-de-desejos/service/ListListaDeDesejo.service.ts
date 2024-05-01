/* eslint-disable no-await-in-loop */
import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { ListaDeDesejo } from '../entitie/ListaDeDesejo';
import { IListaDeDesejoRepository } from '../repository/ListaDeDesejoRepository.interface';

@injectable()
class ListListaDeDesejoService {
  constructor(
    @inject('ListaDeDesejoRepository')
    private listaDeDesejoRepository: IListaDeDesejoRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AutorRepository')
    private autorRepository: IAutorRepository,

    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<ListaDeDesejo>,
  ): Promise<IPaginatedResponse<ListaDeDesejo>> {
    if (!data.filter || !data.filter.usu_id)
      throw new Error('Usuário não encontrado.');

    const user = await this.userRepository.findBy({
      usu_Id: data.filter.usu_id,
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const listaDeDesejo = await this.listaDeDesejoRepository.listBy(data);

    // para cada livro na lista de desejos, buscar o livro e adiciona o autor e editora
    for (let i = 0; i < listaDeDesejo.results.length; i += 1) {
      const livro = await this.livroRepository.findBy({
        liv_Id: listaDeDesejo.results[i].liv_id,
      });

      if (!livro) {
        throw new Error('Livro não encontrado.');
      }

      const autor = await this.autorRepository.findBy({
        aut_Id: livro.liv_aut_id,
      });

      if (!autor) {
        throw new Error('Autor não encontrado.');
      }

      const editora = await this.editoraRepository.findBy({
        edi_Id: livro.liv_edi_id,
      });

      if (!editora) {
        throw new Error('Editora não encontrada.');
      }

      Object.assign(listaDeDesejo.results[i], {
        livro: {
          ...livro,
          autor,
          editora,
        },
      });
    }

    return listaDeDesejo;
  }
}

export { ListListaDeDesejoService };
