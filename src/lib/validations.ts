import { z } from "zod";
import { travelTypes } from "@/config/site";

/** Indian mobile: accepts 10 digits, with optional +91 / 91 / 0 prefix. */
export const indianMobile = z
  .string()
  .min(1, "Mobile number is required")
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v), {
    message: "Enter a valid 10-digit Indian mobile number",
  })
  .transform((v) => v.replace(/^(\+91|91|0)/, ""));

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Please enter your full name")
    .max(80, "Name is too long"),
  mobile: indianMobile,
  travelType: z.enum(travelTypes, { message: "Please select a travel type" }),
  destination: z.string().min(1, "Destination is required").max(120),
  pickupLocation: z.string().min(1, "Pickup location is required").max(160),
  travelDate: z
    .string()
    .min(1, "Travel date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Enter a valid date" })
    .refine(
      (v) => {
        const d = new Date(v);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d >= today;
      },
      { message: "Travel date cannot be in the past" }
    ),
  passengers: z.coerce
    .number({ message: "Enter the number of passengers" })
    .int("Passengers must be a whole number")
    .min(1, "At least 1 passenger")
    .max(200, "For very large groups, please call us directly"),
  requirements: z.string().max(600, "Please keep requirements under 600 characters").optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
