import { customAlphabet } from "nanoid";

// Short, readable, no confusing chars (no 0/O, 1/I/L)
const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const generate = customAlphabet(alphabet, 6);

export function generateReferenceNumber(prefix: "APT" | "INQ"): string {
  return `LMC-${prefix}-${generate()}`;
}
// Example: "LMC-APT-K9X3QR"
