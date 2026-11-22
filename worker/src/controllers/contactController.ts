import { Env } from "../types/env";
import { validateContactInput } from "../validators/inputValidators";

export async function handleContactSubmission(
  request: Request,
  env: Env,
  corsHeaders: Headers,
  requestId: string
): Promise<Response> {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          errors: ["Invalid JSON payload."],
          timestamp: new Date().toISOString(),
          requestId,
        }),
        { status: 400, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }

    const { valid, errors, data } = validateContactInput(body);
    if (!valid) {
      return new Response(
        JSON.stringify({
          success: false,
          errors,
          timestamp: new Date().toISOString(),
          requestId,
        }),
        { status: 422, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }

    const id = `inq_${crypto.randomUUID()}`;
    const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert into D1 contact_inquiries table
    await env.DB.prepare(
      `INSERT INTO contact_inquiries (
        id, full_name, company_name, email, phone, division, message, ip_address, user_agent, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`
    )
      .bind(
        id,
        data.name,
        data.company,
        data.email,
        data.phone,
        data.division,
        data.message,
        clientIp,
        userAgent
      )
      .run();

    // Log to audit table
    await env.DB.prepare(
      `INSERT INTO audit_logs (id, event_type, resource_type, resource_id, details, ip_address)
       VALUES (?, 'contact_submission', 'contact_inquiries', ?, ?, ?)`
    )
      .bind(
        `aud_${crypto.randomUUID()}`,
        id,
        JSON.stringify({ email: data.email, division: data.division, company: data.company }),
        clientIp
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your inquiry has been successfully received by our commercial team in Riyadh.",
        inquiryId: id,
        timestamp: new Date().toISOString(),
        requestId,
      }),
      { status: 201, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error processing contact submission:", err);
    return new Response(
      JSON.stringify({
        success: false,
        errors: ["An internal error occurred while saving your inquiry. Please try again."],
        timestamp: new Date().toISOString(),
        requestId,
      }),
      { status: 500, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
    );
  }
}
