import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { Estado } from '../entity/Estado';

interface IEstadoRepository extends IBasicRepository<Estado> {}

export { IEstadoRepository };
