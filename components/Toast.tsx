"use client";

import { useUI } from "./ui/UIContext";

export default function Toast() {
  const { toast } = useUI();
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-ink text-cream px-6 py-3 rounded-pill text-sm shadow-lift transition-all duration-300 ${
        toast
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      {toast}
    </div>
  );
}
