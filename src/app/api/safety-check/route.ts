import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { runSafetyEngine } from "@/lib/safety-engine";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const patient = body.patient;

    if (!patient) {
      return NextResponse.json(
        { error: "Patient missing" },
        { status: 400 }
      );
    }

    // FETCH DRUG MASTER
    const { data: drugs } = await supabase
      .from("drugs")
      .select("*");

    // FETCH FORMULARY
    const { data: formularyMaster } = await supabase
      .from("hospital_formulary")
      .select("*");

    const result = await runSafetyEngine(
      patient,
      drugs || [],
      formularyMaster || []
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Server Error",
      },
      { status: 500 }
    );
  }
}