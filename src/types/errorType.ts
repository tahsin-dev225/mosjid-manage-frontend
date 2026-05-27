export interface ErrorSource {
  path: string;
  message: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  errorSources: ErrorSource[];
  stack?: string;
  error: {
    statusCode: number;
  };
}
