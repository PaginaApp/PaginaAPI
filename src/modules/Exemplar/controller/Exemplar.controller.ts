import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { CreateExemplarService } from '../service/CreateExemplar.service';
import { DeleteExemplarService } from '../service/DeleteExemplar.service';
import { FindExemplarByIdService } from '../service/FindExemplarById.service';
import { ListExemplarByLivroService } from '../service/ListaExemplarByLivro.service';
import { ListExemplarByUserService } from '../service/ListExemparByUser.service';
import { ListHomeService } from '../service/ListHome.service';
import { UpdateExemplarService } from '../service/UpdateExemplar.service';

class ExemplarController {
  async create(req: Request, res: Response) {
    const {
      exe_Descricao,
      exe_Negociando = false,
      exe_liv_id,
      exe_usu_id,
      exe_epg_id,
      exe_ecp_id,
      exe_trs_id,
      exe_Preco,
      exe_Prazo,
    } = req.body;

    const createExemplarService = container.resolve(CreateExemplarService);

    const data = await createExemplarService.execute(
      {
        exe_Descricao,
        exe_Negociando,
        exe_liv_id,
        exe_usu_id,
        exe_epg_id,
        exe_ecp_id,
        exe_Prazo,
        exe_Preco,
      },
      exe_trs_id,
    );

    return res.status(200).json(data);
  }

  async update(req: Request, res: Response) {
    const {
      exe_Descricao,
      exe_Negociando,
      exe_liv_id,
      exe_usu_id,
      exe_epg_id,
      exe_ecp_id,
    } = req.body;

    const { exe_Id } = req.params;

    const updateExemplarService = container.resolve(UpdateExemplarService);

    const data = await updateExemplarService.execute({
      exe_Descricao,
      exe_Negociando,
      exe_liv_id,
      exe_usu_id,
      exe_epg_id,
      exe_ecp_id,
      exe_Id,
    });

    return res.status(200).json(data);
  }

  async delete(req: Request, res: Response) {
    const { exe_Id } = req.params;

    const deleteExemplarService = container.resolve(DeleteExemplarService);

    await deleteExemplarService.execute(exe_Id);

    return res.status(200).json({ message: 'Exemplar deletado com sucesso' });
  }

  async listExemplarByUser(req: Request, res: Response) {
    const { exe_usu_id } = req.params;
    const { page, limit } = req.query;

    const listExemplarByUserService = container.resolve(
      ListExemplarByUserService,
    );

    const data = await listExemplarByUserService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: { exe_usu_id } as Partial<Exemplar>,
    });

    return res.status(200).json(data);
  }

  async listExemplarByLivro(req: Request, res: Response) {
    const { exe_liv_id } = req.params;
    const { page, limit } = req.query;

    const listExemplarByBookService = container.resolve(
      ListExemplarByLivroService,
    );

    const data = await listExemplarByBookService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: { exe_liv_id } as Partial<Exemplar>,
    });

    return res.status(200).json(data);
  }

  async findExemplar(req: Request, res: Response) {
    const { exe_Id } = req.params;

    const findExemplarByIdService = container.resolve(FindExemplarByIdService);

    const exemplar = await findExemplarByIdService.execute(exe_Id);

    return res.status(200).json(exemplar);
  }

  async listExemplar(req: Request, res: Response) {
    const { page, limit } = req.query;

    const listExemplarByUserService = container.resolve(ListHomeService);

    const data = await listExemplarByUserService.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json(data);
  }
}

export { ExemplarController };
