import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateEditoraService } from '../service/CreateEditora.service';
import { DeleteEditoraService } from '../service/DeleteEditora.service';
import { ListEditoraService } from '../service/ListEditora.service';

class EditoraController {
  async create(req: Request, res: Response) {
    const { edi_Nome } = req.body;

    const createEditoraService = container.resolve(CreateEditoraService);

    const data = await createEditoraService.execute({ edi_Nome });

    return res.status(200).json(data);
  }

  async Delete(req: Request, res: Response) {
    const { edi_Id } = req.params;

    const deleteEditoraService = container.resolve(DeleteEditoraService);

    const data = await deleteEditoraService.execute(edi_Id);

    return res.status(200).json(data);
  }

  async list(req: Request, res: Response) {
    const { page, limit } = req.query;

    const listEditoraService = container.resolve(ListEditoraService);

    const data = await listEditoraService.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json(data);
  }
}

export { EditoraController };
