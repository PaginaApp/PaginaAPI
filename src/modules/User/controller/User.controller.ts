import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUser } from '../service/CreateUser.service';
import { DeleteUserService } from '../service/DeleteUser.service';
import { FindById } from '../service/FindById.service';

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

  async FindById(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindById);

    const user = await findById.execute(id);

    return res.status(200).json(user);
  }

  async DeleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return res.status(204).send();
  }
}

export { UserController };
