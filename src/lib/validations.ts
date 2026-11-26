import { z } from "zod";
import { travelTypes } from "@/config/site";

/** Indian mobile: accepts 10 digits, with optional +91 / 91 / 0 prefix. */
export const indianMobile = z
  .string()
  .trim()
  .min(1, "Mobile number is required")
  .transform((v) => v.replace(/[\s\-().]/g, ""))
  .refine((v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v), {
    message: "Enter a valid 10-digit Indian mobile number",
  })
  .refine((v) => !/^[6-9](\d)\1{8}$/.test(v.replace(/^(\+91|91|0)/, "")), {
    message: "Enter a real mobile number",
  })
  .transform((v) => v.replace(/^(\+91|91|0)/, ""));

/** Today in India (YYYY-MM-DD), so the "past date" check does not depend on server timezone. */
function todayIST(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

const text = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(min, `${label} is too short`)
    .max(max, `${label} is too long`)
    .refine((v) => /\p{L}/u.test(v), { message: `${label} must contain letters` });

export const enquirySchema = z.object({
  fullName: text("Full name", 3, 80).refine((v) => /^[\p{L}][\p{L}\p{M}\s.'-]*$/u.test(v), {
    message: "Name can only have letters, spaces, . ' and -",
  }),
  mobile: indianMobile,
  travelType: z.enum(travelTypes, { message: "Please select a travel type" }),
  destination: text("Destination", 2, 120),
  pickupLocation: text("Pickup location", 2, 160),
  travelDate: z
    .string()
    .trim()
    .min(1, "Travel date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
    .refine((v) => !Number.isNaN(Date.parse(v + "T00:00:00Z")) && new Date(v + "T00:00:00Z").toISOString().slice(0, 10) === v, {
      message: "Enter a valid date",
    })
    .refine((v) => v >= todayIST(), { message: "Travel date cannot be in the past" })
    .refine(
      (v) => {
        const max = new Date(todayIST() + "T00:00:00Z");
        max.setUTCFullYear(max.getUTCFullYear() + 2);
        return v <= max.toISOString().slice(0, 10);
      },
      { message: "Please pick a date within the next 2 years" }
    ),
  passengers: z.coerce
    .number({ message: "Enter the number of passengers" })
    .int("Passengers must be a whole number")
    .min(1, "At least 1 passenger")
    .max(200, "For very large groups, please call us directly"),
  requirements: z.string().trim().max(600, "Please keep requirements under 600 characters").optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
