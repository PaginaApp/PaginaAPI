import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { Cidade } from '../entity/Cidade';

interface ICidadeRepository extends IBasicRepository<Cidade> {}

export { ICidadeRepository };
