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
import { EstadoRepository } from '@modules/Estado/repository/EstadoRepository';
import { IEstadoRepository } from '@modules/Estado/repository/IEstadoRepository.interface';
import { ListaDeDesejoRepository } from '@modules/Listas-de-desejos/repository/ListaDeDesejoRepository';
import { IListaDeDesejoRepository } from '@modules/Listas-de-desejos/repository/ListaDeDesejoRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { LivroRepository } from '@modules/Livro/repository/LivroRepository';
import { IPapelRepository } from '@modules/Papel/repository/IPapelRepository.interface';
import { PapelRepository } from '@modules/Papel/repository/PapelRepository';
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

// utils
container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<IFireBase>('FireBaseProvider', FireBaseProvider);
