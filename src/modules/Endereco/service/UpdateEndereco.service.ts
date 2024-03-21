import { ICidadeRepository } from '@modules/Cidade/repository/ICidadeRepository.interface';
import { IEstadoRepository } from '@modules/Estado/repository/IEstadoRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ICreateEnderecoDTO } from '../DTO/ICreateEnderecoDTO';
import { IShowEnderecoDTO } from '../DTO/IShowEnderecoDTO';

@injectable()
class UpdateEnderecoService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository,
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository,
  ) {}

  public async execute(data: ICreateEnderecoDTO): Promise<IShowEnderecoDTO> {
    const user = await this.userRepository.findBy({ usu_Id: data.usu_Id });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    if (!user.usu_CEP) {
      throw new EntityNotFoundError('Endereço não encontrado');
    }

    const estado = await this.estadoRepository.findBy({
      est_UF: data.endereco.usu_est_UF,
    });

    if (!estado) {
      throw new EntityNotFoundError('Estado não encontrado');
    }

    let cid_nome;

    if (
      data.endereco.usu_cid_nome &&
      // eslint-disable-next-line quotes
      data.endereco.usu_cid_nome.includes("'")
    ) {
      cid_nome = data.endereco.usu_cid_nome.replace(/'/g, '"');
    } else {
      cid_nome = data.endereco.usu_cid_nome;
    }

    const cidade = await this.cidadeRepository.findBy({
      cid_Nome: cid_nome,
      cid_est_id: estado.est_Id,
    });

    if (!cidade) {
      throw new EntityNotFoundError('Cidade não encontrada');
    }

    const endereco = await this.userRepository.endereco(
      {
        usu_Rua: data.endereco.usu_Rua,
        usu_Numero: data.endereco.usu_Numero,
        usu_Bairro: data.endereco.usu_Bairro,
        usu_CEP: data.endereco.usu_CEP,
        usu_Complemento: data.endereco.usu_Complemento,
        usu_cid_id: cidade.cid_Id,
      },
      data.usu_Id,
    );

    return {
      usu_Rua: endereco.usu_Rua,
      usu_Numero: endereco.usu_Numero,
      usu_Bairro: endereco.usu_Bairro,
      usu_CEP: endereco.usu_CEP,
      usu_Complemento: endereco.usu_Complemento,
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

export { UpdateEnderecoService };
