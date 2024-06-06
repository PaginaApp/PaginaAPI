import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityAlreadyExistError } from '@shared/errors/EntityAlreadyExistError';
import { inject, injectable } from 'tsyringe';
import { CreateListaDeDesejoDTO } from '../DTO/CreateListaDeDesejoDTO';
import { ListaDeDesejo } from '../entitie/ListaDeDesejo';
import { IListaDeDesejoRepository } from '../repository/ListaDeDesejoRepository.interface';

@injectable()
export class CreateListaDeDesejoService {
  constructor(
    @inject('ListaDeDesejoRepository')
    private listaDeDesejoRepository: IListaDeDesejoRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: CreateListaDeDesejoDTO): Promise<ListaDeDesejo> {
    const livro = await this.livroRepository.findBy({ liv_Id: data.liv_id });

    if (!livro) {
      throw new Error('Livro não encontrado.');
    }

    const user = await this.userRepository.findBy({ usu_Id: data.usu_id });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const listaDeDesejoExists = await this.listaDeDesejoRepository.findBy({
      liv_id: data.liv_id,
      usu_id: data.usu_id,
    });

    if (listaDeDesejoExists) {
      throw new EntityAlreadyExistError('Livro já está na lista de desejos.');
    }

    const listaDeDesejo = await this.listaDeDesejoRepository.create(data);

    return listaDeDesejo;
  }
}
