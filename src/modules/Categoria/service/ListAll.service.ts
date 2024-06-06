import { inject, injectable } from 'tsyringe';
import { Categoria } from '../entitie/Categoria';
import { ICategoriaRepository } from '../repository/ICategoriaRepository.interface';

@injectable()
class ListAllCategoriaService {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,
  ) {}

  async execute(): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.listBy({
      limit: 100,
      page: 1,
    });

    return categorias.results;
  }
}

export { ListAllCategoriaService };
