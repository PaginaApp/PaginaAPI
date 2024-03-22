import { IPaginatedRequest } from './IPaginatedRequest';
import { IPaginatedResponse } from './IPaginatedResponse';

interface IBasicRepository<TEntity> {
  findBy(partial: Partial<TEntity>): Promise<TEntity | null>;

  listBy(
    request: IPaginatedRequest<TEntity>,
  ): Promise<IPaginatedResponse<TEntity>>;
}

export { IBasicRepository };
