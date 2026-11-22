/**
 * AEVORYN MASTER API CLIENT
 * Connects frontend forms to the Cloudflare Worker API Engine
 */

const PRODUCTION_API_URL = "https://aevoryn-api.smagencywire.workers.dev";

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return PRODUCTION_API_URL;
}

export interface ContactInquiryPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  division: string;
  message: string;
}

export interface RfqPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  division: string;
  projectLocation?: string;
  urgency?: string;
  scope: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  inquiryId?: string;
  rfqId?: string;
  errors?: string[];
  data?: T;
  timestamp?: string;
  requestId?: string;
}

export async function submitContactInquiry(
  payload: ContactInquiryPayload
): Promise<ApiResponse> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({
    success: false,
    errors: ["Failed to parse server response."],
  }));

  if (!response.ok && !json.errors) {
    json.errors = [`Server returned status ${response.status}`];
  }
  return json;
}

export async function submitRfq(payload: RfqPayload): Promise<ApiResponse> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/rfq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({
    success: false,
    errors: ["Failed to parse server response."],
  }));

  if (!response.ok && !json.errors) {
    json.errors = [`Server returned status ${response.status}`];
  }
  return json;
}
