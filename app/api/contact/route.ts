import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_SECONDS = 30;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 300;

const ipRateLimit = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    const now = Date.now();
    const last = ipRateLimit.get(ip);

    if (last && now - last < RATE_LIMIT_SECONDS * 1000) {
      const wait = Math.ceil(
        (RATE_LIMIT_SECONDS * 1000 - (now - last)) / 1000
      );
      return NextResponse.json(
        { error: `Aguarde ${wait}s antes de enviar novamente.` },
        { status: 429 }
      );
    }

    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: "Limite de caracteres excedido." },
        { status: 400 }
      );
    }

    // Regex simples para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    // Envia para ntfy.sh
    const res = await fetch("https://ntfy.sh/atirson-portfolio", {
      method: "POST",
      body: `📨 Nova mensagem do portfólio\n\n👤 Nome: ${name}\n📧 Email: ${email}\n💬 Mensagem:\n${message}`,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Falha ao enviar notificação." },
        { status: 500 }
      );
    }

    ipRateLimit.set(ip, now);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Erro no envio:", e);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
