import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUser } from '../service/CreateUser.service';

class UserController {
  async create(req: Request, res: Response) {
    const { usu_Nome, usu_Email, usu_Senha, usu_Telefone, usu_CPF, usu_Nasc } =
      req.body;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute({
      usu_Nome,
      usu_Email,
      usu_Senha,
      usu_Telefone,
      usu_CPF,
      usu_Nasc,
      usu_pap_id: '',
    });

    return res.status(201).json(user);
  }
}

export { UserController };
