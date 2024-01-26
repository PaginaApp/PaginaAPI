import { IPaginatedRequest } from './IPaginatedRequest';
import { IPaginatedResponse } from './IPaginatedResponse';

interface IRepository<TEntity, TCreate, TUpdate> {
  create(entity: TCreate): Promise<TEntity>;

  findBy(partial: Partial<TEntity>): Promise<TEntity | null>;

  listBy(
    request: IPaginatedRequest<TEntity>,
  ): Promise<IPaginatedResponse<TEntity>>;

  update(entity: TUpdate): Promise<TEntity>;

  delete(entity: TEntity): Promise<void>;
}

export { IRepository };
