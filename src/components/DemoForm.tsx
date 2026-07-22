"use client";

import { useState } from "react";

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Work Email", type: "email" },
  { name: "company", label: "Company", type: "text" },
] as const;

export default function DemoForm() {
  const [sent, setSent] = useState(false);

  // UI-only: no network submission wired. Surfaces a local confirmation.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
        <p className="text-[18px] font-medium text-zinc-900">Thanks — we&apos;ll be in touch.</p>
        <p className="mt-2 text-[14px] text-zinc-500">
          A Navanta lead will reach out to schedule your demo within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block text-[13px] font-medium text-zinc-700">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] text-zinc-900 outline-none transition-colors focus:border-[#5C3D97]"
          />
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] text-zinc-900 outline-none transition-colors focus:border-[#5C3D97]"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Request a Demo
      </button>
    </form>
  );
}
