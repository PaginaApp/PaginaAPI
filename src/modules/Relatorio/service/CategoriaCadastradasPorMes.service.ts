/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { CategoriasNumberDTO } from '../DTO/CategoriasNumberDTO';
import { RelatorioMensalResponseDTO } from '../DTO/RelatorioMensalResponseDTO';
import { Relatorio } from '../entitie/Relatorio';

@injectable()
class CategoriaCadastradasPorMesService {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
  ) {}

  public async execute(
    ano: number,
  ): Promise<Relatorio<RelatorioMensalResponseDTO<CategoriasNumberDTO>>> {
    const categorias = await this.categoriaRepository.listBy({
      filter: {},
      page: 1,
      limit: 1000,
    });

    const relatorioMensal: RelatorioMensalResponseDTO<CategoriasNumberDTO> = {
      Ano: ano,
      Janeiro: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Fevereiro: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Marco: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Abril: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },

      Maio: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Junho: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Julho: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Agosto: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Setembro: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Outubro: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Novembro: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
      Dezembro: {
        categorias: [
          {
            name: '',
            number: 0,
          },
        ],
      },
    };

    for (let i = 1; i <= 12; i += 1) {
      const categoriasNumber = new CategoriasNumberDTO();

      for (const categoria of categorias.results) {
        categoriasNumber.categorias.push({
          name: categoria.cat_Nome,
          number: 0,
        });
      }

      const exemplares = await this.exemplarRepository.exemplaresByMonth(
        i,
        ano,
      );

      for (const exemplar of exemplares) {
        const livro = await this.livroRepository.findBy({
          liv_Id: exemplar.exe_liv_id,
        });

        if (!livro) {
          throw new EntityNotFoundError('Livro não encontrado');
        }

        const categoriasLivro = await this.categoriaLivroRepository.listBy({
          filter: { liv_id: livro.liv_Id },
          page: 1,
          limit: 1000,
        });

        for (const categoriaLivro of categoriasLivro.results) {
          const categoria = await this.categoriaRepository.findBy({
            cat_Id: categoriaLivro.cat_id,
          });

          if (!categoria) {
            throw new EntityNotFoundError('Categoria não encontrada');
          }

          const categoriaEncontrada = categoriasNumber.categorias.find(
            (cat) => cat.name === categoria.cat_Nome,
          );

          if (categoriaEncontrada) {
            categoriaEncontrada.number += 1;
          }
        }
      }

      switch (i) {
        case 1:
          relatorioMensal.Janeiro = categoriasNumber;
          break;
        case 2:
          relatorioMensal.Fevereiro = categoriasNumber;
          break;
        case 3:
          relatorioMensal.Marco = categoriasNumber;
          break;
        case 4:
          relatorioMensal.Abril = categoriasNumber;
          break;
        case 5:
          relatorioMensal.Maio = categoriasNumber;
          break;
        case 6:
          relatorioMensal.Junho = categoriasNumber;
          break;
        case 7:
          relatorioMensal.Julho = categoriasNumber;
          break;
        case 8:
          relatorioMensal.Agosto = categoriasNumber;
          break;
        case 9:
          relatorioMensal.Setembro = categoriasNumber;
          break;
        case 10:
          relatorioMensal.Outubro = categoriasNumber;
          break;
        case 11:
          relatorioMensal.Novembro = categoriasNumber;
          break;
        case 12:
          relatorioMensal.Dezembro = categoriasNumber;
          break;
        default:
          break;
      }
    }

    return {
      data: relatorioMensal,
      generatedAt: new Date(),
    };
  }
}

export { CategoriaCadastradasPorMesService };
