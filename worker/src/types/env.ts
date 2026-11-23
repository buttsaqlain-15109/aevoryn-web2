export interface Env {
  DB: D1Database;
  SUPPLIER_FILES?: R2Bucket;
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
  ADMIN_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  ADMIN_NOTIFICATION_EMAIL?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  timestamp: string;
  requestId: string;
}
