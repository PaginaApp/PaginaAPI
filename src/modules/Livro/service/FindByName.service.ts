import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class FindByNameService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('AutorRepository')
    private autorRepository: IAutorRepository,

    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,
  ) {}

  async execute(liv_Titulo: string): Promise<Livro | null> {
    const livro = await this.livroRepository.findBy({
      liv_Titulo,
    });

    if (!livro) {
      throw new EntityNotFoundError(
        'Livro não encontrado tente novamente mais tarde!!',
      );
    }

    const autor = await this.autorRepository.findBy({
      aut_Id: livro.liv_aut_id,
    });

    const editora = await this.editoraRepository.findBy({
      edi_Id: livro.liv_edi_id,
    });

    if (!autor || !editora) {
      throw new EntityNotFoundError(
        'Autor não encontrado tente novamente mais tarde!!',
      );
    }

    Object.assign(livro, { autor, editora });

    return livro;
  }
}

export { FindByNameService };
