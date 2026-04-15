import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Stage = "contact" | "enrichment";

type Body = {
  stage?: Stage;
  submissionId?: string;
  creditSituation?: string;
  employmentStatus?: string;
  monthlyIncomeRange?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  vehicleType?: string;
  timeline?: string;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function asSubmissionId(input?: string) {
  const trimmed = safeTrim(input);
  return trimmed || crypto.randomUUID();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const stage: Stage = body.stage === "enrichment" ? "enrichment" : "contact";
  const submissionId = asSubmissionId(body.submissionId);

  const firstName = safeTrim(body.firstName);
  const lastName = safeTrim(body.lastName);
  const phone = safeTrim(body.phone);
  const email = safeTrim(body.email).toLowerCase();

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "Missing name." },
      { status: 400 },
    );
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Invalid phone." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email." },
      { status: 400 },
    );
  }

  const creditSituation = safeTrim(body.creditSituation);
  const employmentStatus = safeTrim(body.employmentStatus);
  const monthlyIncomeRange = safeTrim(body.monthlyIncomeRange);
  const vehicleType = safeTrim(body.vehicleType);
  const timeline = safeTrim(body.timeline);

  try {
    const host = requiredEnv("SMTP_HOST");
    const port = Number(requiredEnv("SMTP_PORT"));
    const user = requiredEnv("SMTP_USER");
    const pass = requiredEnv("SMTP_PASS");
    const from = requiredEnv("SMTP_FROM");
    const to = requiredEnv("LEADS_TO_EMAIL");

    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject =
      stage === "contact"
        ? `New pre-qual lead: ${firstName} ${lastName}`
        : `Pre-qual enrichment: ${firstName} ${lastName}`;

    const textLines = [
      `Submission ID: ${submissionId}`,
      `Stage: ${stage}`,
      "",
      "Contact",
      `Name: ${firstName} ${lastName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      "",
      "Step 1 (pre-qual)",
      `Credit situation: ${creditSituation || "—"}`,
      `Employment status: ${employmentStatus || "—"}`,
      `Monthly income range: ${monthlyIncomeRange || "—"}`,
      "",
      "Step 3 (optional)",
      `Vehicle type: ${vehicleType || "—"}`,
      `Timeline: ${timeline || "—"}`,
    ];

    await transport.sendMail({
      from,
      to,
      subject,
      text: textLines.join("\n"),
      replyTo: email,
    });

    return NextResponse.json({ ok: true, submissionId });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Failed to send email notification.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

