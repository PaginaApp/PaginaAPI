/* eslint-disable no-await-in-loop */
import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { Categoria } from '@modules/Categoria/entitie/Categoria';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
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

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
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
    await Promise.all(
      listaDeDesejo.results.map(async (item) => {
        const livroPromise = this.livroRepository.findBy({
          liv_Id: item.liv_id,
        });

        const autorPromise = livroPromise.then((livro) => {
          if (!livro) {
            throw new Error('Livro não encontrado.');
          }

          return this.autorRepository.findBy({
            aut_Id: livro.liv_aut_id,
          });
        });

        const editoraPromise = livroPromise.then((livro) => {
          if (!livro) {
            throw new Error('Livro não encontrado.');
          }

          return this.editoraRepository.findBy({
            edi_Id: livro.liv_edi_id,
          });
        });

        const [livro, autor, editora] = await Promise.all([
          livroPromise,
          autorPromise,
          editoraPromise,
        ]);

        if (!autor) {
          throw new Error('Autor não encontrado.');
        }

        if (!editora) {
          throw new Error('Editora não encontrada.');
        }

        const categoriaLivro = await this.categoriaLivroRepository.listBy({
          filter: { liv_id: item.liv_id },
          page: 1,
          limit: 3,
        });

        // para cada categoria, busca a categoria
        const categorias: Categoria[] = [];
        await Promise.all(
          categoriaLivro.results.map(async (cat) => {
            const categoria = await this.categoriaRepository.findBy({
              cat_Id: cat.cat_id,
            });

            if (!categoria) {
              return;
            }

            categorias.push(categoria);
          }),
        );

        Object.assign(item, {
          livro,
          autor,
          editora,
          categorias,
        });
      }),
    );

    return listaDeDesejo;
  }
}

export { ListListaDeDesejoService };
