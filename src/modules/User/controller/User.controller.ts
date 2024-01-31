import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { User } from '../entity/User';
import { CreateUser } from '../service/CreateUser.service';
import { DeleteUserService } from '../service/DeleteUser.service';
import { FindById } from '../service/FindById.service';
import { ListUserService } from '../service/ListUser.service';

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

  async ListUser(req: Request, res: Response) {
    const { page, limit, filter } = req.query;

    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: filter as Partial<User>,
    });

    return res.status(200).json(users);
  }
}

export { UserController };
