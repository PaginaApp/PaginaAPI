import { EntityAlreadyExistError } from '@shared/errors/EntityAlreadyExistError';
import { inject, injectable } from 'tsyringe';
import { CreateEditoraDTO } from '../DTO/CreateEditoraDTO';
import { Editora } from '../entitie/Editora';
import { IEditoraRepository } from '../repository/IEditoraRepository.interface';

@injectable()
class CreateEditoraService {
  constructor(
    @inject('EditoraRepository')
    private EditoraRepository: IEditoraRepository,
  ) {}

  async execute(data: CreateEditoraDTO): Promise<Editora> {
    const nomeUper = data.edi_Nome.toUpperCase();

    const editoraExist = await this.EditoraRepository.findBy({
      edi_Nome: nomeUper,
    });

    if (editoraExist) {
      throw new EntityAlreadyExistError(
        'Editora já existe por favor tente novamente',
      );
    }

    const editora = await this.EditoraRepository.create({
      edi_Nome: nomeUper,
    });

    return editora;
  }
}

export { CreateEditoraService };
