import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class FindExemplarByIdService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,

    @inject('AutorRepository')
    private autorRepository: IAutorRepository,
  ) {}

  async execute(exe_Id: string): Promise<Exemplar> {
    const exemplar = await this.exemplarRepository.findBy({
      exe_Id,
    });

    if (!exemplar) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    const estadoCapa = await this.estadoCapaRepository.findBy({
      ecp_Id: exemplar.exe_ecp_id,
    });

    if (!estadoCapa) {
      throw new EntityNotFoundError('Estado da capa não encontrado');
    }

    const estadoPaginas = await this.estadoPaginasRepository.findBy({
      epg_Id: exemplar.exe_epg_id,
    });

    if (!estadoPaginas) {
      throw new EntityNotFoundError('Estado das páginas não encontrado');
    }

    Object.assign(exemplar, {
      estadoCapa,
      estadoPaginas,
    });

    const livro = await this.livroRepository.findBy({
      liv_Id: exemplar.exe_liv_id,
    });

    if (!livro) {
      throw new EntityNotFoundError('Livro não encontrado');
    }

    const editora = await this.editoraRepository.findBy({
      edi_Id: livro.liv_edi_id,
    });

    if (!editora) {
      throw new EntityNotFoundError('Editora não encontrada');
    }

    const autor = await this.autorRepository.findBy({
      aut_Id: livro.liv_aut_id,
    });

    if (!autor) {
      throw new EntityNotFoundError('Autor não encontrado');
    }

    Object.assign(livro, {
      editora,
      autor,
    });

    Object.assign(exemplar, {
      livro,
    });

    return exemplar;
  }
}

export { FindExemplarByIdService };
