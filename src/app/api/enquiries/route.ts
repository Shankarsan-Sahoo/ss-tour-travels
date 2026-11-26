import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import type { EnquiryResult } from "@/types";

/**
 * POST /api/enquiries
 * Validates and stores an enquiry when Supabase is configured. The response
 * is always honest about persistence: if the database write failed or no
 * database is configured, `saved` is false and the client falls back to the
 * WhatsApp delivery flow without ever claiming a successful submission.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<EnquiryResult>(
      { ok: false, saved: false, whatsappOnly: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<EnquiryResult>(
      {
        ok: false,
        saved: false,
        whatsappOnly: false,
        message: parsed.error.issues[0]?.message ?? "Please check the form details.",
      },
      { status: 422 }
    );
  }

  const enquiry = parsed.data;

  if (!isSupabaseConfigured) {
    // No database configured: the website still delivers the enquiry through
    // WhatsApp. We say exactly that, nothing more.
    return NextResponse.json<EnquiryResult>(
      {
        ok: true,
        saved: false,
        whatsappOnly: true,
        message: "Details ready. Send them to us on WhatsApp to complete your enquiry.",
      },
      { status: 200 }
    );
  }

  const supabase = getSupabaseAdmin()!;
  const { error } = await supabase.from("enquiries").insert({
    full_name: enquiry.fullName,
    mobile: enquiry.mobile,
    travel_type: enquiry.travelType,
    destination: enquiry.destination,
    pickup_location: enquiry.pickupLocation,
    travel_date: enquiry.travelDate,
    passengers: enquiry.passengers,
    requirements: enquiry.requirements ?? null,
  });

  if (error) {
    // Never claim success when the write failed.
    return NextResponse.json<EnquiryResult>(
      {
        ok: false,
        saved: false,
        whatsappOnly: true,
        message:
          "We could not save your enquiry just now. Please send the same details on WhatsApp - one tap below.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json<EnquiryResult>(
    { ok: true, saved: true, whatsappOnly: false, message: "Enquiry received. We will call you back shortly." },
    { status: 200 }
  );
}
