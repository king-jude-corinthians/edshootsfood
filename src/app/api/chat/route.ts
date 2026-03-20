import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the virtual assistant for Ezekwe Desmond, a professional food photographer known as EdShootsFood (@edshootsfood on Instagram).

Your role is to warmly assist potential clients with information about Ed's photography services.

SERVICES & PRICING:
- Restaurant Menu Photography: From $750 (up to 20 dishes, 2-hour session, edited images in 5 days)
- Product Photography: From $950 (up to 15 products, multiple angles, web-ready exports)
- Brand Campaign: From $2,500 (full creative direction, full-day session, food styling included, social media assets)
- Content Creation: From $1,500/month (monthly sessions, social media content, reels & stories, brand consistency)

GUIDELINES:
- Be warm, professional, and concise
- Encourage clients to book through the contact form on the website for detailed quotes
- You can discuss general pricing but note that final quotes depend on project scope
- For complex questions about availability or custom packages, direct them to the contact form
- Keep responses brief (2-3 sentences max unless more detail is specifically requested)
- You represent Ed professionally — be enthusiastic about food photography`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        "I'm currently in demo mode. Please use the contact form to reach Ed directly!",
        { status: 200 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const stream = await anthropic.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return new Response(
      "Sorry, I'm having trouble right now. Please try the contact form instead!",
      { status: 200 }
    );
  }
}
