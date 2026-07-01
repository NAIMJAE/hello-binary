"use client";

type WorksheetDragHandleProps = {
  label: string;
  onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
};

export function WorksheetDragHandle({ label, onPointerDown }: WorksheetDragHandleProps) {
  return (
    <button
      aria-label={label}
      className="flex h-7 w-7 shrink-0 cursor-grab items-center justify-center rounded-md text-slate-300 transition hover:bg-slate-100 hover:text-slate-500 active:cursor-grabbing"
      type="button"
      onPointerDown={onPointerDown}
    >
      <svg aria-hidden className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
        <circle cx="5" cy="4" r="1.25" />
        <circle cx="11" cy="4" r="1.25" />
        <circle cx="5" cy="8" r="1.25" />
        <circle cx="11" cy="8" r="1.25" />
        <circle cx="5" cy="12" r="1.25" />
        <circle cx="11" cy="12" r="1.25" />
      </svg>
    </button>
  );
}
