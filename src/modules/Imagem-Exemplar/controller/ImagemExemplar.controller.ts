import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateImagemExemplarService } from '../service/CreateImagemExemplar.service';
import { DeleteImagemExemplarService } from '../service/DeleteImagemExemplar.service';
import { GetImagemExemplarService } from '../service/GetImagemExemplar.service';

class ImagemExemplarController {
  async create(request: Request, response: Response): Promise<Response> {
    const { imagem } = request.body;
    const { exe_Id } = request.params;

    const createImagemExemplarService = container.resolve(
      CreateImagemExemplarService,
    );

    const imageBuffer = Buffer.from(imagem, 'base64');

    const imagemExemplar = await createImagemExemplarService.execute({
      iex_exe_id: exe_Id,
      iex_image: imageBuffer,
    });

    return response.status(201).json(imagemExemplar);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { iex_Id } = request.params;

    const deleteImagemExemplarService = container.resolve(
      DeleteImagemExemplarService,
    );

    await deleteImagemExemplarService.execute(iex_Id);

    return response.status(204).send();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { iex_Id } = request.params;

    const getImagemExemplarService = container.resolve(
      GetImagemExemplarService,
    );

    const file = await getImagemExemplarService.execute(iex_Id);

    response.set('Content-Type', 'image/png');
    return response.status(200).send(file);
  }
}

export { ImagemExemplarController };
