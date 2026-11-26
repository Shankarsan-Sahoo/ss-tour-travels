import { site } from "@/config/site";
import type { EnquiryPayload } from "@/types";

/** Build a wa.me link with a properly encoded pre-filled message. */
export function whatsappLink(message: string, number: string = site.contact.whatsappPrimary): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Compose the enquiry message sent to WhatsApp after form submission. */
export function enquiryMessage(e: EnquiryPayload): string {
  const lines = [
    "Hello SS Tour & Travels, I would like to plan a trip.",
    "",
    `Name: ${e.fullName}`,
    `Mobile: ${e.mobile}`,
    `Travel Type: ${e.travelType}`,
    `Destination: ${e.destination}`,
    `Pickup Location: ${e.pickupLocation}`,
    `Travel Date: ${e.travelDate}`,
    `Passengers: ${e.passengers}`,
  ];
  if (e.requirements?.trim()) lines.push(`Requirements: ${e.requirements.trim()}`);
  lines.push("", "Please share the available options and pricing.");
  return lines.join("\n");
}

/** WhatsApp link for a completed enquiry form. */
export function enquiryWhatsappLink(e: EnquiryPayload): string {
  return whatsappLink(enquiryMessage(e));
}
