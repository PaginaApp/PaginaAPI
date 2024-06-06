import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { UnknownError } from '@shared/errors/UnknownError';
import { inject, injectable } from 'tsyringe';
import { ImagemExemplar } from '../entitie/ImagemExemplar';
import { IImagemExemplarRepository } from '../repository/ImagemExemplarRepository.interface';

@injectable()
class ListImagemExemplarByExemplarIdService {
  constructor(
    @inject('ImagemExemplarRepository')
    private imagemExemplarRepository: IImagemExemplarRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,
  ) {}

  async execute(exe_Id: string): Promise<ImagemExemplar[]> {
    const exemplar = await this.exemplarRepository.findBy({
      exe_Id,
    });

    if (!exemplar) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    const imagens = await this.imagemExemplarRepository.listBy({
      page: 1,
      limit: 100,
      filter: {
        iex_exe_id: exe_Id,
      },
    });

    if (imagens.results.length <= 0) {
      const defaultImage = await this.imagemExemplarRepository.findBy({
        iex_Id: process.env.EXEMPLAR_DEFAULT_ID,
      });

      if (!defaultImage) {
        throw new UnknownError('Erro desconhecido, favor informar o suporte');
      }

      imagens.results.push(defaultImage);
    }

    return imagens.results;
  }
}

export { ListImagemExemplarByExemplarIdService };
