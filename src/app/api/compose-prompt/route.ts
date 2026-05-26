import { NextResponse } from "next/server";
import { composePrompt } from "@/lib/prompt-composer";

export async function POST(req: Request) {
  const { patient, safety } = await req.json();

  const prompt = composePrompt(patient, safety);

  return NextResponse.json({ prompt });
}