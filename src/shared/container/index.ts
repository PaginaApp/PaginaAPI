import { CidadeRepository } from '@modules/Cidade/repository/CidadeRepository';
import { ICidadeRepository } from '@modules/Cidade/repository/ICidadeRepository.interface';
import { EstadoRepository } from '@modules/Estado/repository/EstadoRepository';
import { IEstadoRepository } from '@modules/Estado/repository/IEstadoRepository.interface';
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

// utils
container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<IFireBase>('FireBaseProvider', FireBaseProvider);
