import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IEditoraRepository } from '../repository/IEditoraRepository.interface';

@injectable()
class DeleteEditoraService {
  constructor(
    @inject('EditoraRepository')
    private EditoraRepository: IEditoraRepository,
  ) {}

  async execute(edi_Id: string): Promise<void> {
    const editora = await this.EditoraRepository.findBy({
      edi_Id,
    });

    if (!editora) {
      throw new EntityNotFoundError('Editora não encontrada');
    }

    await this.EditoraRepository.delete(editora);
  }
}

export { DeleteEditoraService };
