"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FilePlus, House, LayersPlus } from "lucide-react";
import Modal from "@/components/ui/modal";
import EnquiryForm from "@/components/forms/enquiryForm";

type FormType = "enquiry_form" | "home_collection";

/* DL.pen hero "Quick Actions": three shortcuts in one divided bar. */
export default function QuickActions() {
  const [form, setForm] = useState<FormType | null>(null);

  const cell =
    "group flex flex-col gap-2.5 p-3 text-left transition-colors hover:bg-dl-bg md:gap-3.5 md:p-5";
  const badge =
    "flex size-[34px] items-center justify-center rounded-[10px] bg-dl-red-soft text-dl-red md:size-10 md:rounded-xl";
  const title = "font-display text-[12.5px] font-bold leading-tight text-dl-ink md:text-[15.5px]";
  const sub = "text-[11px] text-dl-muted md:text-[13px]";

  return (
    <>
      <div className="grid grid-cols-3 divide-x divide-dl-line overflow-hidden rounded-[18px] border border-dl-line bg-white md:rounded-[20px]">
        <button type="button" onClick={() => setForm("enquiry_form")} className={cell}>
          <span className="flex items-center justify-between">
            <span className={badge}><FilePlus className="size-4 md:size-[19px]" aria-hidden /></span>
            <ArrowUpRight className="hidden size-[18px] text-dl-muted group-hover:text-dl-ink md:block" aria-hidden />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={title}>Upload prescription</span>
            <span className={sub}>
              <span className="md:hidden">We&apos;ll call you</span>
              <span className="hidden md:inline">We&apos;ll book the right tests</span>
            </span>
          </span>
        </button>

        <button type="button" onClick={() => setForm("home_collection")} className={cell}>
          <span className="flex items-center justify-between">
            <span className={badge}><House className="size-4 md:size-[19px]" aria-hidden /></span>
            <ArrowUpRight className="hidden size-[18px] text-dl-muted group-hover:text-dl-ink md:block" aria-hidden />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={title}>
              <span className="md:hidden">Home collection</span>
              <span className="hidden md:inline">Book home collection</span>
            </span>
            <span className={sub}>
              <span className="md:hidden">Free above ₹500</span>
              <span className="hidden md:inline">Slots from 6 AM, 7 days</span>
            </span>
          </span>
        </button>

        <Link href="/tests/#tests-section" className={cell}>
          <span className="flex items-center justify-between">
            <span className={badge}><LayersPlus className="size-4 md:size-[19px]" aria-hidden /></span>
            <span className="hidden rounded-md bg-dl-green px-[7px] py-[3px] text-[10.5px] font-extrabold tracking-[0.08em] text-white md:block">
              NEW
            </span>
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={title}>
              <span className="md:hidden">Build a package</span>
              <span className="hidden md:inline">Create your own package</span>
            </span>
            <span className={sub}>
              <span className="md:hidden">Pick your tests</span>
              <span className="hidden md:inline">Pick tests, save up to 40%</span>
            </span>
          </span>
        </Link>
      </div>

      <Modal isOpen={form !== null} onClose={() => setForm(null)}>
        {form && <EnquiryForm formType={form} />}
      </Modal>
    </>
  );
}
