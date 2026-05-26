import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateOptionC } from "@/lib/option-c-engine";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: patients, error } = await supabase
      .from("patients")
      .select("*");

    if (error) {
      console.error("❌ Option C Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!patients || patients.length === 0) {
      console.warn("⚠️ Option C: No patients found in database");
      return NextResponse.json([]);
    }

    console.log(`✅ Option C: Fetched ${patients.length} patients`);

    const result = patients.map((patient: any) => {
      const optionC = generateOptionC(patient);
      console.log(`  ✅ Generated Option C for ${patient.patient_code}`);
      return optionC;
    });

    console.log("✅ Option C Result:", result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ Option C Exception:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
