import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { CreateImagemExemplarDTO } from '../DTO/CreateImagemExemplarDTO';
import { ImagemExemplar } from '../entitie/ImagemExemplar';
import { IImagemExemplarRepository } from '../repository/ImagemExemplarRepository.interface';

@injectable()
class CreateImagemExemplarService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('ImagemExemplarRepository')
    private imagemExemplarRepository: IImagemExemplarRepository,

    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,
  ) {}

  async execute(data: CreateImagemExemplarDTO): Promise<ImagemExemplar> {
    const exemplar = await this.exemplarRepository.findBy({
      exe_Id: data.iex_exe_id,
    });

    if (!exemplar) {
      throw new EntityNotFoundError('Exemplar não encontrado, tente novamente');
    }

    const imagemExemplar = await this.imagemExemplarRepository.create(data);

    const filePath = `${process.env.EXEMPLAR_DIRECTORY}/${imagemExemplar.iex_Id}`;

    await this.fireBaseProvider.uploadFile(filePath, data.iex_image);

    return imagemExemplar;
  }
}

export { CreateImagemExemplarService };
