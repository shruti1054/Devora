"use client";

import { useUI } from "./ui/UIContext";

export default function Toast() {
  const { toast } = useUI();
  return (
    <div
      className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] max-w-[90vw] bg-ink text-cream px-5 sm:px-6 py-3 rounded-pill text-sm shadow-lift transition-all duration-300 text-center ${
        toast
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      {toast}
    </div>
  );
}
