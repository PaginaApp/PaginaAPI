import { AutorRepository } from '@modules/Autor/repository/AutorRepository';
import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { CategoriaLivroRepository } from '@modules/Categoria-Livro/repository/CategoriaLivroRepository';
import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { CategoriaRepository } from '@modules/Categoria/repository/CategoriaRepository';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { CidadeRepository } from '@modules/Cidade/repository/CidadeRepository';
import { ICidadeRepository } from '@modules/Cidade/repository/ICidadeRepository.interface';
import { EditoraRepository } from '@modules/Editora/repository/EditoraRepository';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { EstadoCapaRepository } from '@modules/Estado-Capa/repository/EstadoCapaRepository';
import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { EstadoPaginasRepository } from '@modules/Estado-Paginas/repository/EstadoPaginaRepository';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { EstadoRepository } from '@modules/Estado/repository/EstadoRepository';
import { IEstadoRepository } from '@modules/Estado/repository/IEstadoRepository.interface';
import { ExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository';
import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { ExemplarRepository } from '@modules/Exemplar/repository/ExemplarRepository';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { ImagemExemplarRepository } from '@modules/Imagem-Exemplar/repository/ImagemExemplarRepository';
import { IImagemExemplarRepository } from '@modules/Imagem-Exemplar/repository/ImagemExemplarRepository.interface';
import { ListaDeDesejoRepository } from '@modules/Listas-de-desejos/repository/ListaDeDesejoRepository';
import { IListaDeDesejoRepository } from '@modules/Listas-de-desejos/repository/ListaDeDesejoRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { LivroRepository } from '@modules/Livro/repository/LivroRepository';
import { IPapelRepository } from '@modules/Papel/repository/IPapelRepository.interface';
import { PapelRepository } from '@modules/Papel/repository/PapelRepository';
import { StatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { ITermoPrivacidadeRepository } from '@modules/Termos-Privacidade/Repository/ITermoPrivacidade.repository';
import { TermoPrivacidadeRepository } from '@modules/Termos-Privacidade/Repository/TermoPrivacidadeRepositort';
import { TipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { TransacaoAceitaRepository } from '@modules/Transacao-Aceita/repository/TransacaoAceitaRepositori';
import { ITransacaoAceitaRepository } from '@modules/Transacao-Aceita/repository/TransacaoAceitaRepository.interface';
import { TransacaoRepository } from '@modules/Transacao/repository/TransacaoRepository';
import { ITransacaoRepository } from '@modules/Transacao/repository/TransacaoRepository.interface';
import { UserRepository } from '@modules/User/repository/UserRepository';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { container } from 'tsyringe';
import { FireBaseProvider } from './providers/FireBase/implementation/FireBaseProvider';
import { IFireBase } from './providers/FireBase/model/IFireBase.interface';
import { HashProvider } from './providers/hashProvider/implementation/HashProvider';
import { IHashProvider } from './providers/hashProvider/model/IHashProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IPapelRepository>(
  'PapelRepository',
  PapelRepository,
);

container.registerSingleton<IEstadoRepository>(
  'EstadoRepository',
  EstadoRepository,
);

container.registerSingleton<ICidadeRepository>(
  'CidadeRepository',
  CidadeRepository,
);

container.registerSingleton<IAutorRepository>(
  'AutorRepository',
  AutorRepository,
);

container.registerSingleton<IEditoraRepository>(
  'EditoraRepository',
  EditoraRepository,
);

container.registerSingleton<ILivroRepository>(
  'LivroRepository',
  LivroRepository,
);

container.registerSingleton<ICategoriaRepository>(
  'CategoriaRepository',
  CategoriaRepository,
);

container.registerSingleton<ICategoriaLivroRepository>(
  'CategoriaLivroRepository',
  CategoriaLivroRepository,
);

container.registerSingleton<IListaDeDesejoRepository>(
  'ListaDeDesejoRepository',
  ListaDeDesejoRepository,
);

container.registerSingleton<IEstadoCapaRepository>(
  'EstadoCapaRepository',
  EstadoCapaRepository,
);

container.registerSingleton<IEstadoPaginasRepository>(
  'EstadoPaginasRepository',
  EstadoPaginasRepository,
);

container.registerSingleton<IExemplarRepository>(
  'ExemplarRepository',
  ExemplarRepository,
);

container.registerSingleton<IImagemExemplarRepository>(
  'ImagemExemplarRepository',
  ImagemExemplarRepository,
);

container.registerSingleton<ITipoTransacaoRepository>(
  'TipoTransacaoRepository',
  TipoTransacaoRepository,
);

container.registerSingleton<IExemplarTransacaoRepository>(
  'ExemplarTransacaoRepository',
  ExemplarTransacaoRepository,
);

container.registerSingleton<ITransacaoAceitaRepository>(
  'TransacaoAceitaRepository',
  TransacaoAceitaRepository,
);

container.registerSingleton<IStatusTransacaoRepository>(
  'StatusTransacaoRepository',
  StatusTransacaoRepository,
);

container.registerSingleton<ITransacaoRepository>(
  'TransacaoRepository',
  TransacaoRepository,
);

container.registerSingleton<ITermoPrivacidadeRepository>(
  'TermoPrivacidadeRepository',
  TermoPrivacidadeRepository,
);
// utils
container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<IFireBase>('FireBaseProvider', FireBaseProvider);
