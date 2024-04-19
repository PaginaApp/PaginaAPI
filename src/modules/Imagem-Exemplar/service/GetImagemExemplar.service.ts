import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IImagemExemplarRepository } from '../repository/ImagemExemplarRepository.interface';

@injectable()
class GetImagemExemplarService {
  constructor(
    @inject('ImagemExemplarRepository')
    private imagemExemplarRepository: IImagemExemplarRepository,

    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,
  ) {}

  async execute(iex_Id: string): Promise<Buffer> {
    const imagemExemplar = await this.imagemExemplarRepository.findBy({
      iex_Id,
    });

    if (!imagemExemplar) {
      throw new EntityNotFoundError('Imagem não encontrada');
    }

    const file = await this.fireBaseProvider.downloadFile(
      imagemExemplar.iex_Path,
    );

    return file;
  }
}

export { GetImagemExemplarService };
