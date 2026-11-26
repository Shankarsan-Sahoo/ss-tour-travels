import type { TravelType } from "@/config/site";

export interface EnquiryPayload {
  fullName: string;
  mobile: string;
  travelType: TravelType;
  destination: string;
  pickupLocation: string;
  travelDate: string;
  passengers: number;
  requirements?: string;
}

export interface EnquiryResult {
  ok: boolean;
  /** true when the enquiry was persisted in Supabase */
  saved: boolean;
  /** true when Supabase is not configured and WhatsApp is the delivery channel */
  whatsappOnly: boolean;
  message: string;
}

export interface VisitorStats {
  uniqueVisitors: number;
  totalViews: number;
  configured: boolean;
}
