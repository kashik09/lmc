/**
 * Calculate age in years from a date of birth.
 * Returns whole-year age based on current date.
 */
export function calculateAge(dateOfBirth: Date | string): number {
  const dob = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * Uganda legal majority age (per the Constitution + Children Act).
 * Used to validate Patient Type vs Date of Birth.
 */
export const ADULT_AGE_THRESHOLD = 18;
