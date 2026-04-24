"use client";
// CLIENT: date state + keyboard handlers

import { useState, useCallback, useEffect, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
} from "date-fns";

export type CustomCalendarProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  mode: "date" | "datetime";
  dateRules: "past-only" | "future-only" | "any";
  minDate?: Date;
  maxDate?: Date;
  defaultMonth?: Date;
  timeSlots?: string[];
  selectedTime?: string | null;
  onTimeChange?: (time: string) => void;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CustomCalendar({
  value,
  onChange,
  mode,
  dateRules,
  minDate,
  maxDate,
  defaultMonth,
  timeSlots = [],
  selectedTime,
  onTimeChange,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    value ? startOfMonth(value) : startOfMonth(defaultMonth ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = startOfDay(new Date());

  // Determine if a date is disabled based on rules
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      const dayStart = startOfDay(date);

      // Check minDate/maxDate first (overrides dateRules)
      if (minDate && isBefore(dayStart, startOfDay(minDate))) return true;
      if (maxDate && isAfter(dayStart, startOfDay(maxDate))) return true;

      // Apply dateRules
      if (dateRules === "past-only") {
        // Can only select dates before today
        if (!isBefore(dayStart, today)) return true;
      } else if (dateRules === "future-only") {
        // Can only select today or future
        if (isBefore(dayStart, today)) return true;
      }

      return false;
    },
    [dateRules, minDate, maxDate, today]
  );

  // Generate calendar grid
  const generateCalendarDays = useCallback(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    // Start week on Monday (weekStartsOn: 1)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }, [currentMonth]);

  const days = generateCalendarDays();

  // Navigation handlers
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Select date
  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(date);
    }
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const current = focusedDate || value || today;

      let newDate: Date | null = null;

      switch (e.key) {
        case "ArrowLeft":
          newDate = addDays(current, -1);
          break;
        case "ArrowRight":
          newDate = addDays(current, 1);
          break;
        case "ArrowUp":
          newDate = addDays(current, -7);
          break;
        case "ArrowDown":
          newDate = addDays(current, 7);
          break;
        case "Enter":
        case " ":
          if (focusedDate && !isDateDisabled(focusedDate)) {
            handleDateSelect(focusedDate);
          }
          e.preventDefault();
          return;
        default:
          return;
      }

      if (newDate) {
        e.preventDefault();
        setFocusedDate(newDate);
        // Update month view if needed
        if (!isSameMonth(newDate, currentMonth)) {
          setCurrentMonth(startOfMonth(newDate));
        }
      }
    },
    [focusedDate, value, today, currentMonth, isDateDisabled]
  );

  // Focus management
  useEffect(() => {
    if (focusedDate && calendarRef.current) {
      const focusedButton = calendarRef.current.querySelector(
        `[data-date="${format(focusedDate, "yyyy-MM-dd")}"]`
      ) as HTMLButtonElement;
      focusedButton?.focus();
    }
  }, [focusedDate]);

  return (
    <div
      ref={calendarRef}
      className="w-72 rounded-lg border border-border bg-card p-3 shadow-lg"
      onKeyDown={handleKeyDown}
    >
      {/* Month Header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-foreground"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="font-heading text-sm font-semibold text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-foreground"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-1 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = value && isSameDay(day, value);
          const isDisabled = isDateDisabled(day);
          const isFocused = focusedDate && isSameDay(day, focusedDate);
          const isToday = isSameDay(day, today);

          return (
            <button
              key={day.toISOString()}
              type="button"
              data-date={format(day, "yyyy-MM-dd")}
              onClick={() => handleDateSelect(day)}
              disabled={isDisabled}
              tabIndex={isFocused ? 0 : -1}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-selected={isSelected || undefined}
              aria-disabled={isDisabled}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                !isCurrentMonth
                  ? "text-muted-foreground/40"
                  : isSelected
                    ? "bg-primary font-semibold text-primary-foreground"
                    : isDisabled
                      ? "cursor-not-allowed text-muted-foreground/50"
                      : isToday
                        ? "border border-primary font-semibold text-primary"
                        : "text-foreground hover:bg-muted"
              } ${isFocused && !isSelected ? "ring-2 ring-primary ring-offset-1" : ""}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Time Slots (datetime mode only) */}
      {mode === "datetime" && timeSlots.length > 0 && value && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Select time
          </p>
          <div className="grid max-h-32 grid-cols-4 gap-1 overflow-y-auto">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onTimeChange?.(slot)}
                className={`rounded-md px-2 py-1 text-xs transition-colors ${
                  selectedTime === slot
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-primary/20"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
