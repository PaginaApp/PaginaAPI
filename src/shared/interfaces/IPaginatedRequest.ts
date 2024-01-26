interface IPaginatedRequest<T> {
  page?: number;
  limit?: number;
  filter?: Partial<T>;
}

export { IPaginatedRequest };
