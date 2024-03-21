import { ICidadeRepository } from '@modules/Cidade/repository/ICidadeRepository.interface';
import { IEstadoRepository } from '@modules/Estado/repository/IEstadoRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IShowEnderecoDTO } from '../DTO/IShowEnderecoDTO';

@injectable()
class ShowEnderecoService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository,

    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository,
  ) {}

  public async execute(usu_Id: string): Promise<IShowEnderecoDTO> {
    const user = await this.userRepository.findBy({ usu_Id });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    if (
      !user.usu_CEP ||
      !user.usu_cid_id ||
      !user.usu_Bairro ||
      !user.usu_Rua ||
      !user.usu_Numero
    ) {
      throw new EntityNotFoundError('Endereço não encontrado');
    }

    const cidade = await this.cidadeRepository.findBy({
      cid_Id: user.usu_cid_id,
    });

    if (!cidade) {
      throw new EntityNotFoundError('Cidade não encontrada, endereço inválido');
    }

    const estado = await this.estadoRepository.findBy({
      est_Id: cidade.cid_est_id,
    });

    if (!estado) {
      throw new EntityNotFoundError('Estado não encontrado, endereço inválido');
    }

    return {
      usu_Bairro: user.usu_Bairro,
      usu_CEP: user.usu_CEP,
      usu_Complemento: user.usu_Complemento,
      usu_Numero: user.usu_Numero,
      usu_Rua: user.usu_Rua,
      usu_cid: {
        cid_Nome: cidade.cid_Nome,
        cid_Id: cidade.cid_Id,
        cid_est: {
          est_Nome: estado.est_Nome,
          est_Id: estado.est_Id,
        },
      },
    };
  }
}

export { ShowEnderecoService };
