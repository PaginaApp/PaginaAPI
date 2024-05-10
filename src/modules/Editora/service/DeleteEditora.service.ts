import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { EntityUsedError } from '@shared/errors/EntitieUsedError';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IEditoraRepository } from '../repository/IEditoraRepository.interface';

@injectable()
class DeleteEditoraService {
  constructor(
    @inject('EditoraRepository')
    private EditoraRepository: IEditoraRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(edi_Id: string): Promise<void> {
    const editora = await this.EditoraRepository.findBy({
      edi_Id,
    });

    if (!editora) {
      throw new EntityNotFoundError('Editora não encontrada');
    }

    const livros = await this.livroRepository.listBy({
      filter: {
        liv_edi_id: editora.edi_Id,
      },
    });

    if (livros.results.length > 0) {
      throw new EntityUsedError('Editora sendo utilizada impossivel deletar');
    }

    await this.EditoraRepository.delete(editora);
  }
}

export { DeleteEditoraService };
