export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
  ADMIN_API_KEY?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  timestamp: string;
  requestId: string;
}
