import { IBasicRepository } from '@shared/interfaces/BasicRepository';
import { Cidade } from '../entity/Cidade';

interface ICidadeRepository extends IBasicRepository<Cidade> {
  findByNameAndState(
    cid_Nome: string,
    cid_est_id: string,
  ): Promise<Cidade | null>;
}

export { ICidadeRepository };
