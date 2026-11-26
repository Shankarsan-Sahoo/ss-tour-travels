"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle, Phone, Send, TriangleAlert } from "lucide-react";
import { site, travelTypes } from "@/config/site";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { enquiryWhatsappLink } from "@/lib/whatsapp";
import type { EnquiryPayload, EnquiryResult } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Reveal from "@/components/animations/Reveal";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "done"; result: EnquiryResult; payload: EnquiryPayload }
  | { status: "whatsapp"; payload: EnquiryPayload };

export default function EnquirySection({ supabaseConfigured }: { supabaseConfigured: boolean }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { requirements: "" },
  });

  async function onSubmit(values: EnquiryInput) {
    const payload = values as EnquiryPayload;
    if (!supabaseConfigured) {
      // No enquiry storage yet: deliver through WhatsApp only. Open the
      // pre-filled draft and make clear the user must press send there.
      window.open(enquiryWhatsappLink(payload), "_blank", "noopener,noreferrer");
      setState({ status: "whatsapp", payload });
      return;
    }
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await res.json()) as EnquiryResult;
      setState({ status: "done", result, payload });
    } catch {
      setState({
        status: "done",
        result: {
          ok: false,
          saved: false,
          whatsappOnly: true,
          message: "No connection right now. Send the same details on WhatsApp - one tap below.",
        },
        payload,
      });
    }
  }

  const done = state.status === "done" ? state : null;
  const handedToWhatsapp = state.status === "whatsapp" ? state : null;

  return (
    <section id="enquiry" className="bg-navy py-20 lg:py-28" aria-labelledby="enquiry-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-[0.28em] text-gold uppercase">Enquire &amp; Book</p>
            <h2 id="enquiry-heading" className="text-3xl font-extrabold tracking-tight text-cream md:text-[2.6rem] md:leading-[1.1]">
              Let&apos;s Plan Your Next Journey.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-cream/75">
              Tell us where, when and how many - we&apos;ll come back with options and honest
              pricing. Prefer talking? We&apos;re one call away.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={site.contact.phonePrimaryHref}
                className="flex items-center gap-3.5 rounded-xl border border-cream/12 bg-cream/5 px-5 py-4 transition hover:border-gold/40 hover:bg-cream/10"
              >
                <Phone className="h-5 w-5 text-gold-soft" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-cream/55">Call us directly</span>
                  <span className="block text-base font-bold text-cream">{site.contact.phonePrimary}</span>
                </span>
              </a>
              <a
                href={site.contact.phoneSecondaryHref}
                className="flex items-center gap-3.5 rounded-xl border border-cream/12 bg-cream/5 px-5 py-4 transition hover:border-gold/40 hover:bg-cream/10"
              >
                <Phone className="h-5 w-5 text-gold-soft" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-cream/55">Alternate number</span>
                  <span className="block text-base font-bold text-cream">{site.contact.phoneSecondary}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-8">
              <AnimatePresence mode="wait">
                {handedToWhatsapp ? (
                  <motion.div
                    key="whatsapp"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                    role="status"
                  >
                    <MessageCircle className="h-14 w-14 text-[#25D366]" aria-hidden="true" />
                    <h3 className="text-2xl font-extrabold text-navy">
                      Almost done, {handedToWhatsapp.payload.fullName.split(" ")[0]}
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed text-fog">
                      WhatsApp should now be open with your enquiry pre-filled. Press send there
                      to complete it. This website does not store enquiries yet, so the WhatsApp
                      message is the only copy we receive.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={enquiryWhatsappLink(handedToWhatsapp.payload)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
                      >
                        Open WhatsApp again
                      </a>
                      <button
                        type="button"
                        onClick={() => setState({ status: "idle" })}
                        className="inline-flex items-center justify-center rounded-lg border border-navy/20 px-5 py-3 text-sm font-bold text-navy transition hover:bg-navy/5"
                      >
                        Edit details
                      </button>
                    </div>
                  </motion.div>
                ) : done?.result.saved ? (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                    role="status"
                  >
                    <CheckCircle2 className="h-14 w-14 text-emerald-600" aria-hidden="true" />
                    <h3 className="text-2xl font-extrabold text-navy">Enquiry saved</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-fog">
                      Thank you, {done.payload.fullName.split(" ")[0]}. Your {done.payload.travelType.toLowerCase()} enquiry details are saved. To get it to us, send it on WhatsApp.
                    </p>
                    <p className="text-xs text-fog">
                      In a hurry? Call{" "}
                      <a href={site.contact.phonePrimaryHref} className="font-bold text-royal underline">
                        {site.contact.phonePrimary}
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid gap-5"
                  >
                    {done && !done.result.saved && (
                      <div className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3" role="alert">
                        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                        <p className="text-sm text-amber-900">{done.result.message}</p>
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.fullName} {...register("fullName")} />
                        <FieldError message={errors.fullName?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input id="mobile" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" aria-invalid={!!errors.mobile} {...register("mobile")} />
                        <FieldError message={errors.mobile?.message} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="travelType">Travel Type</Label>
                        <Controller
                          control={control}
                          name="travelType"
                          render={({ field }) => (
                            <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v)}>
                              <SelectTrigger id="travelType" aria-invalid={!!errors.travelType} className="w-full">
                                <SelectValue placeholder="Select travel type" />
                              </SelectTrigger>
                              <SelectContent>
                                {travelTypes.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError message={errors.travelType?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input id="destination" placeholder="e.g. Puri, Deomali" aria-invalid={!!errors.destination} {...register("destination")} />
                        <FieldError message={errors.destination?.message} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="pickupLocation">Pickup Location</Label>
                        <Input id="pickupLocation" placeholder="City / town / landmark" aria-invalid={!!errors.pickupLocation} {...register("pickupLocation")} />
                        <FieldError message={errors.pickupLocation?.message} />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="travelDate">Travel Date</Label>
                          <Input id="travelDate" type="date" min={new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })} aria-invalid={!!errors.travelDate} {...register("travelDate")} />
                          <FieldError message={errors.travelDate?.message} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="passengers">Passengers</Label>
                          <Input id="passengers" type="number" inputMode="numeric" min={1} placeholder="e.g. 12" aria-invalid={!!errors.passengers} {...register("passengers")} />
                          <FieldError message={errors.passengers?.message} />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="requirements">Additional Requirements</Label>
                      <Textarea
                        id="requirements"
                        rows={3}
                        placeholder="Anything we should know - occasions, stops, timings..."
                        aria-invalid={!!errors.requirements}
                        {...register("requirements")}
                      />
                      <FieldError message={errors.requirements?.message} />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={state.status === "submitting"}
                        className="flex-1 bg-navy py-3.5 text-sm font-bold text-cream hover:bg-navy-soft"
                      >
                        {state.status === "submitting" ? (
                          <>
                            <Loader2 className="animate-spin" data-icon="inline-start" />
                            Sending...
                          </>
                        ) : supabaseConfigured ? (
                          <>
                            <Send data-icon="inline-start" />
                            Submit Enquiry
                          </>
                        ) : (
                          <>
                            <MessageCircle data-icon="inline-start" />
                            Send enquiry on WhatsApp
                          </>
                        )}
                      </Button>
                      {supabaseConfigured && done?.result.whatsappOnly && (
                        <a
                          href={enquiryWhatsappLink(done.payload)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:brightness-95"
                        >
                          Continue on WhatsApp
                        </a>
                      )}
                    </div>
                    <p className="text-center text-xs text-fog">
                      {supabaseConfigured
                        ? "Submitting saves your enquiry with us. You can also complete it on WhatsApp."
                        : "This opens WhatsApp with your details pre-filled. Press send there to reach us. The website does not store enquiries yet."}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs font-semibold text-destructive" role="alert">
      {message}
    </p>
  );
}
