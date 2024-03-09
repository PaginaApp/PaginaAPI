import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionService } from '../service/session/CreateSession.service';
import { DeleteSessionService } from '../service/session/DeleteSession.service';
import { RefreshSessionService } from '../service/session/RefreshSession.service';

class SessionController {
  async create(request: Request, response: Response) {
    const { usu_Email, usu_Senha } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const session = await createSession.execute({
      usu_Email,
      usu_Senha,
    });

    return response.json(session);
  }

  async delete(request: Request, response: Response) {
    const { refresh_token } = request.body;
    const { usu_Id } = request.params;

    const deleteSession = container.resolve(DeleteSessionService);

    await deleteSession.execute({ usu_Id, refreshToken: refresh_token });

    return response.status(204).send();
  }

  async refresh(request: Request, response: Response) {
    const { refreshToken, usu_Id } = request.body;

    const refreshSession = container.resolve(RefreshSessionService);

    const session = await refreshSession.execute({
      refreshToken,
      usu_Id,
    });

    return response.json(session);
  }
}

export { SessionController };
