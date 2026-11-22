export interface ContactPayload {
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

export function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // basic sanitization
    .trim();
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 150;
}

export function validatePhone(phone: string): boolean {
  // Saudi and international telephone format verification
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 20 && /^[0-9]+$/.test(cleaned);
}

export function normalizeDivision(input: string): string {
  const norm = input.toLowerCase().trim();
  if (norm.includes("infra") || norm.includes("earth") || norm.includes("civil") || norm.includes("بنية")) return "infrastructure";
  if (norm.includes("manpower") || norm.includes("workforce") || norm.includes("قوى") || norm.includes("كوادر")) return "manpower";
  if (norm.includes("material") || norm.includes("supply") || norm.includes("مواد")) return "materials";
  if (norm.includes("equip") || norm.includes("fleet") || norm.includes("معدات")) return "equipment";
  if (norm.includes("general") || norm.includes("عام") || norm === "") return "general";
  return norm;
}

export function validateContactInput(payload: any): { valid: boolean; errors: string[]; data: ContactPayload } {
  const errors: string[] = [];
  const name = sanitize(payload.name);
  const company = sanitize(payload.company);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const rawDivision = sanitize(payload.division || "infrastructure");
  const division = normalizeDivision(rawDivision);
  const message = sanitize(payload.message);

  if (!name || name.length < 2 || name.length > 100) {
    errors.push("Full name is required (2-100 characters).");
  }
  if (!company || company.length < 2 || company.length > 150) {
    errors.push("Company name is required (2-150 characters).");
  }
  if (!validateEmail(email)) {
    errors.push("Valid corporate email address is required.");
  }
  if (!validatePhone(phone)) {
    errors.push("Valid contact telephone/mobile number is required.");
  }
  const allowedDivisions = ["infrastructure", "manpower", "materials", "equipment", "general"];
  if (!allowedDivisions.includes(division)) {
    errors.push("Invalid division selected.");
  }
  if (!message || message.length < 5 || message.length > 3000) {
    errors.push("Inquiry message is required (5-3000 characters).");
  }

  return {
    valid: errors.length === 0,
    errors,
    data: { name, company, email, phone, division, message },
  };
}

export function validateRfqInput(payload: any): { valid: boolean; errors: string[]; data: RfqPayload } {
  const errors: string[] = [];
  const name = sanitize(payload.name);
  const company = sanitize(payload.company);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const rawDivision = sanitize(payload.division || "infrastructure");
  const division = normalizeDivision(rawDivision);
  const projectLocation = sanitize(payload.projectLocation || "Riyadh, Saudi Arabia");
  const urgency = sanitize(payload.urgency || "standard").toLowerCase();
  const scope = sanitize(payload.scope || payload.message || "");

  if (!name || name.length < 2 || name.length > 100) {
    errors.push("Contact name is required (2-100 characters).");
  }
  if (!company || company.length < 2 || company.length > 150) {
    errors.push("Company or organization name is required (2-150 characters).");
  }
  if (!validateEmail(email)) {
    errors.push("Valid email address is required.");
  }
  if (!validatePhone(phone)) {
    errors.push("Valid contact telephone number is required.");
  }
  if (!scope || scope.length < 5 || scope.length > 5000) {
    errors.push("Project scope details are required (5-5000 characters).");
  }

  return {
    valid: errors.length === 0,
    errors,
    data: { name, company, email, phone, division, projectLocation, urgency, scope },
  };
}
