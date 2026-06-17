export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PrismaPaginationParams {
  skip: number;
  take: number;
}

export const getPaginationParams = (
  options: Partial<PaginationOptions>,
): PrismaPaginationParams & Required<PaginationOptions> => {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(options.limit) || 25));
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
    page,
    limit,
  };
};
