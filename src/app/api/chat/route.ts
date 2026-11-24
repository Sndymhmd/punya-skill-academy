import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL =
  process.env.N8N_CHAT_WEBHOOK_URL ||
  'https://n8n-mhibh3zdycgy.eu7.sumopod.my.id/webhook/psa-chat-webhook/chat';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong.' },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        sessionId: sessionId || 'anonymous',
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Layanan chat sedang tidak tersedia. Coba lagi nanti.' },
        { status: 502 }
      );
    }

    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      const reply =
        data.reply ||
        data.output ||
        data.message ||
        data.text ||
        (typeof data === 'string' ? data : null);

      if (!reply) {
        return NextResponse.json(
          { error: 'Maaf, tidak ada balasan dari asisten. Coba ulangi pertanyaan Anda.' },
          { status: 502 }
        );
      }

      return NextResponse.json({ reply });
    }

    const text = await res.text();
    if (!text.trim()) {
      return NextResponse.json(
        { error: 'Maaf, asisten tidak memberikan balasan. Coba ulangi pertanyaan Anda.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: text });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Asisten butuh waktu terlalu lama untuk menjawab. Coba lagi sebentar lagi.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghubungi asisten. Coba lagi nanti.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
