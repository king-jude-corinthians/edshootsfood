import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    // If Resend is configured, send welcome email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "EdShootsFood <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to EdShootsFood!",
        html: `
          <h2>Welcome!</h2>
          <p>Thanks for subscribing to EdShootsFood updates.</p>
          <p>You'll receive behind-the-scenes content, food photography tips, and updates on new projects.</p>
          <p>— Ezekwe Desmond</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
