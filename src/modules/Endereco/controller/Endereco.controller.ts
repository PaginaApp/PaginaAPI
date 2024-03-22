import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateEnderecoService } from '../service/CreateEndereco.service';
import { ShowEnderecoService } from '../service/ShowEndereco.service';
import { UpdateEnderecoService } from '../service/UpdateEndereco.service';

class EnderecoController {
  async create(req: Request, res: Response) {
    const {
      usu_Rua,
      usu_Numero,
      usu_Bairro,
      usu_CEP,
      usu_cid_nome,
      usu_est_UF,
      usu_Complemento,
    } = req.body;

    const { usu_Id } = req.params;
    const createEndereco = container.resolve(CreateEnderecoService);

    const endereco = await createEndereco.execute({
      usu_Id,
      endereco: {
        usu_Rua,
        usu_Numero,
        usu_Bairro,
        usu_CEP,
        usu_cid_nome,
        usu_est_UF,
        usu_Complemento,
      },
    });
    return res.status(201).json(endereco);
  }

  async update(req: Request, res: Response) {
    const {
      usu_Rua,
      usu_Numero,
      usu_Bairro,
      usu_CEP,
      usu_cid_nome,
      usu_est_UF,
      usu_Complemento,
    } = req.body;
    const { usu_Id } = req.params;
    const updateUser = container.resolve(UpdateEnderecoService);
    const user = await updateUser.execute({
      usu_Id,
      endereco: {
        usu_Rua,
        usu_Numero,
        usu_Bairro,
        usu_CEP,
        usu_Complemento,
        usu_cid_nome,
        usu_est_UF,
      },
    });
    return res.status(200).json(user);
  }

  async show(req: Request, res: Response) {
    const { usu_Id } = req.params;
    const updateUser = container.resolve(ShowEnderecoService);
    const user = await updateUser.execute(usu_Id);
    return res.status(200).json(user);
  }
}

export { EnderecoController };
