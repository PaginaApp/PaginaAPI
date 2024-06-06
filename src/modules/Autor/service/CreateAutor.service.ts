import { EntityAlreadyExistError } from '@shared/errors/EntityAlreadyExistError';
import { inject, injectable } from 'tsyringe';
import { CreateAutorDTO } from '../DTO/CreateAutorDTO';
import { Autor } from '../entitie/Autor';
import { IAutorRepository } from '../repository/IAutorRepository.interface';

@injectable()
class CreateAutorService {
  constructor(
    @inject('AutorRepository')
    private autorRepository: IAutorRepository,
  ) {}

  async execute(data: CreateAutorDTO): Promise<Autor> {
    const nameUper = data.aut_Nome.toUpperCase();

    const autorExist = await this.autorRepository.findBy({
      aut_Nome: nameUper,
    });

    if (autorExist) {
      throw new EntityAlreadyExistError('Autor já cadastrado');
    }

    const autor = await this.autorRepository.create({
      aut_Nome: nameUper,
    });

    return autor;
  }
}

export { CreateAutorService };
