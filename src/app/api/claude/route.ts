import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
    },
    body: JSON.stringify({
      model: "claude-3",
      max_tokens: 800,
      messages: [
        { role: "user", content: prompt }
      ],
    }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}