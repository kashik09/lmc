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
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

type ViewMode = "days" | "months" | "years";

function isMonthDisabled(
  year: number,
  month: number,
  dateRules: "past-only" | "future-only" | "any",
  minDate?: Date,
  maxDate?: Date
): boolean {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Apply dateRules first
  if (dateRules === "past-only") {
    // Month must be before current month (or current month if we want to allow selecting days in it)
    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
      return true;
    }
  } else if (dateRules === "future-only") {
    // Month must be current or future
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return true;
    }
  }

  // Then apply minDate/maxDate
  if (minDate) {
    const minYear = minDate.getFullYear();
    const minMonth = minDate.getMonth();
    if (year < minYear || (year === minYear && month < minMonth)) return true;
  }
  if (maxDate) {
    const maxYear = maxDate.getFullYear();
    const maxMonth = maxDate.getMonth();
    if (year > maxYear || (year === maxYear && month > maxMonth)) return true;
  }
  return false;
}

function isYearDisabled(
  year: number,
  dateRules: "past-only" | "future-only" | "any",
  minDate?: Date,
  maxDate?: Date
): boolean {
  const currentYear = new Date().getFullYear();

  // Apply dateRules first
  if (dateRules === "past-only" && year > currentYear) return true;
  if (dateRules === "future-only" && year < currentYear) return true;

  // Then apply minDate/maxDate
  if (minDate && year < minDate.getFullYear()) return true;
  if (maxDate && year > maxDate.getFullYear()) return true;
  return false;
}

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
  const [viewMode, setViewMode] = useState<ViewMode>("days");
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
      // Escape key returns to previous view
      if (e.key === "Escape") {
        e.preventDefault();
        if (viewMode === "years") {
          setViewMode("months");
        } else if (viewMode === "months") {
          setViewMode("days");
        }
        return;
      }

      // Day grid navigation (only in days view)
      if (viewMode === "days") {
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
          if (!isSameMonth(newDate, currentMonth)) {
            setCurrentMonth(startOfMonth(newDate));
          }
        }
      }
    },
    [focusedDate, value, today, currentMonth, isDateDisabled, viewMode]
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

  // Chevron icon component for reuse
  const ChevronLeft = () => (
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
  );

  const ChevronRight = () => (
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
  );

  const displayedYear = currentMonth.getFullYear();
  const displayedMonthIndex = currentMonth.getMonth();

  // Decade calculation for years view
  const decadeStart = Math.floor(displayedYear / 10) * 10;
  const decadeEnd = decadeStart + 9;

  // Generate 12 years for grid: prev decade last year + 10 decade years + next decade first year
  const yearsInGrid = [
    decadeStart - 1,
    ...Array.from({ length: 10 }, (_, i) => decadeStart + i),
    decadeEnd + 1,
  ];

  // Month selection handler
  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(displayedYear, monthIndex, 1));
    setViewMode("days");
  };

  // Year selection handler
  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, displayedMonthIndex, 1));
    setViewMode("months");
  };

  // Year navigation for months view
  const goToPreviousYear = () => {
    setCurrentMonth(new Date(displayedYear - 1, displayedMonthIndex, 1));
  };
  const goToNextYear = () => {
    setCurrentMonth(new Date(displayedYear + 1, displayedMonthIndex, 1));
  };

  // Decade navigation for years view
  const goToPreviousDecade = () => {
    setCurrentMonth(new Date(displayedYear - 10, displayedMonthIndex, 1));
  };
  const goToNextDecade = () => {
    setCurrentMonth(new Date(displayedYear + 10, displayedMonthIndex, 1));
  };

  return (
    <div
      ref={calendarRef}
      className="w-72 rounded-lg border border-border bg-card p-3 shadow-lg"
      onKeyDown={handleKeyDown}
    >
      {/* ===== DAYS VIEW ===== */}
      {viewMode === "days" && (
        <>
          {/* Days Header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("months")}
              className="flex items-center gap-1 rounded-md px-2 py-1 font-heading text-sm font-semibold text-foreground hover:bg-muted"
              aria-label="Change month and year"
            >
              {format(currentMonth, "MMMM yyyy")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Next month"
            >
              <ChevronRight />
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
        </>
      )}

      {/* ===== MONTHS VIEW ===== */}
      {viewMode === "months" && (
        <>
          {/* Months Header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousYear}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Previous year"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("years")}
              className="flex items-center gap-1 rounded-md px-2 py-1 font-heading text-sm font-semibold text-foreground hover:bg-muted"
              aria-label="Change year"
            >
              {displayedYear}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNextYear}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Next year"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Month Grid (3x4) */}
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, idx) => {
              const isSelected = idx === displayedMonthIndex;
              const isDisabled = isMonthDisabled(displayedYear, idx, dateRules, minDate, maxDate);

              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => !isDisabled && handleMonthSelect(idx)}
                  disabled={isDisabled}
                  className={`flex h-10 items-center justify-center rounded-md text-sm transition-colors ${
                    isSelected
                      ? "bg-primary font-semibold text-primary-foreground"
                      : isDisabled
                        ? "cursor-not-allowed text-muted-foreground/50"
                        : "text-foreground hover:bg-muted"
                  }`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ===== YEARS VIEW ===== */}
      {viewMode === "years" && (
        <>
          {/* Years Header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousDecade}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Previous decade"
            >
              <ChevronLeft />
            </button>
            <span className="font-heading text-sm font-semibold text-foreground">
              {decadeStart} – {decadeEnd}
            </span>
            <button
              type="button"
              onClick={goToNextDecade}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Next decade"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Year Grid (4x3) */}
          <div className="grid grid-cols-4 gap-2">
            {yearsInGrid.map((year) => {
              const isSelected = year === displayedYear;
              const isOutsideDecade = year < decadeStart || year > decadeEnd;
              const isDisabled = isYearDisabled(year, dateRules, minDate, maxDate);

              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => !isDisabled && handleYearSelect(year)}
                  disabled={isDisabled}
                  className={`flex h-10 items-center justify-center rounded-md text-sm transition-colors ${
                    isSelected
                      ? "bg-primary font-semibold text-primary-foreground"
                      : isDisabled
                        ? "cursor-not-allowed text-muted-foreground/50"
                        : isOutsideDecade
                          ? "text-muted-foreground hover:bg-muted"
                          : "text-foreground hover:bg-muted"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
