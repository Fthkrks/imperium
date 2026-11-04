import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BUSINESS } from "@/lib/business";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const MAX_LENGTHS = {
  short: 120,
  email: 254,
  address: 300,
  description: 3000,
} as const;

type ServiceRequestPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  appliance: string;
  brand: string;
  description: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];
  const normalized = value?.trim();
  if (!normalized) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return normalized;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPayload(formData: FormData): ServiceRequestPayload {
  const read = (key: string, maxLength: number = MAX_LENGTHS.short) =>
    String(formData.get(key) || "").trim().slice(0, maxLength);

  return {
    name: read("Name"),
    phone: read("Phone"),
    email: read("Email", MAX_LENGTHS.email),
    address: read("Address", MAX_LENGTHS.address),
    zipCode: read("ZipCode"),
    appliance: read("ServiceLabel") || read("ServiceId"),
    brand: read("BrandLabel") || read("BrandId"),
    description: read("Description", MAX_LENGTHS.description),
  };
}

function validate(payload: ServiceRequestPayload): string | null {
  if (!payload.name || !payload.phone || !payload.address) {
    return "Missing required form fields.";
  }
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address.";
  }
  const phoneDigits = payload.phone.replace(/\D/g, "").length;
  if (phoneDigits < 10 || phoneDigits > 15) {
    return "Please enter a valid phone number.";
  }
  return null;
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(`service-request:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please call us instead." },
        { status: 429 },
      );
    }

    const formData = await request.formData();

    // Hidden field that only bots fill in: report success and send nothing.
    if (String(formData.get("Website") || "").trim()) {
      return NextResponse.json({ success: true });
    }

    const payload = buildPayload(formData);
    const validationError = validate(payload);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    const emailPass = getRequiredEnv("EMAIL_PASS");
    const emailUser = getRequiredEnv("EMAIL_USER");
    const emailAuthUser = process.env.EMAIL_AUTH_USER?.trim() || emailUser;
    const leadInbox = process.env.LEAD_INBOX?.trim() || BUSINESS.email;
    const mailFrom = { name: BUSINESS.name, address: emailUser };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailAuthUser,
        pass: emailPass,
      },
    });

    const safe = Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [key, escapeHtml(value)]),
    ) as ServiceRequestPayload;

    const adminHtml = `
      <h2>New Service Request</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Phone:</strong> ${safe.phone}</p>
      <p><strong>Email:</strong> ${safe.email || "-"}</p>
      <p><strong>Address:</strong> ${safe.address}</p>
      <p><strong>Zip Code:</strong> ${safe.zipCode || "-"}</p>
      <p><strong>Appliance:</strong> ${safe.appliance || "-"}</p>
      <p><strong>Brand:</strong> ${safe.brand || "-"}</p>
      <p><strong>Description:</strong><br/>${(safe.description || "-").replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: mailFrom,
      to: leadInbox,
      ...(payload.email ? { replyTo: payload.email } : {}),
      subject: `New Service Request - ${payload.name.replace(/[\r\n]+/g, " ")}`,
      html: adminHtml,
    });

    if (payload.email) {
      // Contains no submitted text, so the form cannot be used to send custom
      // messages to third parties. A failure here must not lose the lead above.
      try {
        await transporter.sendMail({
          from: mailFrom,
          to: payload.email,
          subject: "Your service request has been received",
          html: `
            <h2>Your request has been received</h2>
            <p>Thank you for contacting ${BUSINESS.name}. Our team will contact you as soon as possible.</p>
            <p>Need help sooner? Call us at ${BUSINESS.phone}.</p>
          `,
        });
      } catch (error) {
        console.error("Service request confirmation mail error:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service request mail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send request." },
      { status: 500 },
    );
  }
}
