"use client";
// CLIENT: popover state + click-outside handling

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { CustomCalendar, type CustomCalendarProps } from "./custom-calendar";

type DatePickerFieldProps = {
  label: string;
  required?: boolean;
  value: string; // ISO date string (yyyy-MM-dd)
  onChange: (value: string) => void;
  error?: string;
  mode?: CustomCalendarProps["mode"];
  dateRules?: CustomCalendarProps["dateRules"];
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
};

export function DatePickerField({
  label,
  required = false,
  value,
  onChange,
  error,
  mode = "date",
  dateRules = "any",
  minDate,
  maxDate,
  placeholder = "Select date",
}: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse ISO string to Date for calendar
  const dateValue = value ? new Date(value) : null;

  // Handle date selection
  function handleDateChange(date: Date) {
    onChange(format(date, "yyyy-MM-dd"));
    setIsOpen(false);
  }

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-1 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-left text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
          error ? "border-destructive" : "border-input"
        }`}
      >
        <span className={dateValue ? "text-foreground" : "text-muted-foreground"}>
          {dateValue ? format(dateValue, "dd MMM yyyy") : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 text-muted-foreground"
        >
          <path
            fillRule="evenodd"
            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

      {/* Calendar popover */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1">
          <CustomCalendar
            value={dateValue}
            onChange={handleDateChange}
            mode={mode}
            dateRules={dateRules}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
