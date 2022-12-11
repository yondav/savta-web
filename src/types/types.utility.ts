type DataType<T> = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
} & T;

type ApiResponse<T> = {
  data: T;
  message: string;
};

export type { DataType, ApiResponse };
