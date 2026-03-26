import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ServiceRequestPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  appliance: string;
  applianceLabel: string;
  brand: string;
  brandLabel: string;
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

function buildPayload(formData: FormData): ServiceRequestPayload {
  const toString = (key: string) => String(formData.get(key) || "").trim();

  return {
    name: toString("Name"),
    phone: toString("Phone"),
    email: toString("Email"),
    address: toString("Address"),
    zipCode: toString("ZipCode"),
    appliance: toString("ServiceId"),
    applianceLabel: toString("ServiceLabel"),
    brand: toString("BrandId"),
    brandLabel: toString("BrandLabel"),
    description: toString("Description"),
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = buildPayload(formData);

    if (!payload.name || !payload.phone || !payload.email || !payload.address) {
      return NextResponse.json(
        { success: false, error: "Missing required form fields." },
        { status: 400 },
      );
    }

    const emailPass = getRequiredEnv("EMAIL_PASS");
    const emailUser = getRequiredEnv("EMAIL_USER");
    const emailAuthUser = process.env.EMAIL_AUTH_USER?.trim() || emailUser;
    const mailFrom = emailUser;
    const adminInbox = emailUser;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailAuthUser,
        pass: emailPass,
      },
    });

    const adminHtml = `
      <h2>New Service Request</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Address:</strong> ${payload.address}</p>
      <p><strong>Zip Code:</strong> ${payload.zipCode || "-"}</p>
      <p><strong>Appliance:</strong> ${payload.applianceLabel || payload.appliance || "-"}</p>
      <p><strong>Brand:</strong> ${payload.brandLabel || payload.brand || "-"}</p>
      <p><strong>Description:</strong><br/>${(payload.description || "-").replace(/\n/g, "<br/>")}</p>
    `;

    const customerHtml = `
      <h2>Your request has been received</h2>
      <p>Hello ${payload.name}, we have received your service request. Our team will contact you as soon as possible.</p>
      <p><strong>Request summary:</strong></p>
      <p>Phone: ${payload.phone}</p>
      <p>Address: ${payload.address}</p>
    `;

    await transporter.sendMail({
      from: mailFrom,
      to: adminInbox,
      subject: `New Service Request - ${payload.name}`,
      html: adminHtml,
    });

    await transporter.sendMail({
      from: mailFrom,
      to: payload.email,
      subject: "Your service request has been received",
      html: customerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service request mail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send request." },
      { status: 500 },
    );
  }
}