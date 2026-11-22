import { Env } from "../types/env";
import { validateRfqInput } from "../validators/inputValidators";

export async function handleRfqSubmission(
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

    const { valid, errors, data } = validateRfqInput(body);
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

    const id = `rfq_${crypto.randomUUID()}`;
    const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert into D1 rfq_submissions table
    await env.DB.prepare(
      `INSERT INTO rfq_submissions (
        id, full_name, company_name, email, phone, division, project_location, urgency, scope_details, ip_address, user_agent, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')`
    )
      .bind(
        id,
        data.name,
        data.company,
        data.email,
        data.phone,
        data.division,
        data.projectLocation || "Riyadh, Saudi Arabia",
        data.urgency || "standard",
        data.scope,
        clientIp,
        userAgent
      )
      .run();

    // Log to audit table
    await env.DB.prepare(
      `INSERT INTO audit_logs (id, event_type, resource_type, resource_id, details, ip_address)
       VALUES (?, 'rfq_submission', 'rfq_submissions', ?, ?, ?)`
    )
      .bind(
        `aud_${crypto.randomUUID()}`,
        id,
        JSON.stringify({ email: data.email, division: data.division, company: data.company, urgency: data.urgency }),
        clientIp
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your Request for Quotation (RFQ) has been logged. Our engineering estimation division will prepare a proposal.",
        rfqId: id,
        timestamp: new Date().toISOString(),
        requestId,
      }),
      { status: 201, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error processing RFQ submission:", err);
    return new Response(
      JSON.stringify({
        success: false,
        errors: ["Failed to process RFQ submission. Please try again or contact us directly."],
        timestamp: new Date().toISOString(),
        requestId,
      }),
      { status: 500, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
    );
  }
}
