import { ApiResponseError } from "@/types/api";

export class ApiError extends Error {
  public readonly type: string;
  public readonly title: string;
  public readonly status: number;
  public readonly detail: string;
  public readonly instance: string;
  public readonly errors?: Record<string, string>;

  constructor(errorData: ApiResponseError) {
    super(errorData.title);
    
    this.name = 'ApiError';
    
    this.type = errorData.type;
    this.title = errorData.title;
    this.status = errorData.status;
    this.detail = errorData.detail;
    this.instance = errorData.instance;
    this.errors = errorData.errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  public isStatus(status: number): boolean {
    return this.status === status;
  }

  public isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  public isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  public toApiResponseError(): ApiResponseError {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      detail: this.detail,
      instance: this.instance,
      errors: this.errors,
    };
  }
}