export type SuccessResponse<T> = {
  data: T;
  code: "000000";
  message: "Success";
  requestId: string;
};

export type SuccessPaginatedResponse<T> = SuccessResponse<{
  data: T[];
  pageLimit: number;
  pageNo: number;
  totalPage: number;
}>;

export type PaginationParams<T = unknown> = T & {
  pageLimit?: number;
  pageNo?: number;
};

export type Constructor<T = any> = new (...args: any[]) => T;
