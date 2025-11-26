/**
 * CPF Formatting Utilities
 *
 * Provides functions to format and unformat Brazilian CPF numbers.
 * CPF format: XXX.XXX.XXX-XX (14 characters with mask)
 * Raw format: XXXXXXXXXXX (11 digits only)
 */

/**
 * Formats a CPF string with the standard Brazilian mask (XXX.XXX.XXX-XX).
 * Strips non-numeric characters and applies formatting progressively.
 *
 * @param value - Raw or partially formatted CPF string
 * @returns Formatted CPF string (max 14 characters)
 *
 * @example
 * formatCPF("12345678901") // "123.456.789-01"
 * formatCPF("123456")      // "123.456"
 * formatCPF("123.456")     // "123.456"
 */
export function formatCPF(value: string): string {
  // Remove all non-numeric characters
  const digits = value.replace(/\D/g, "");

  // Limit to 11 digits (CPF length)
  const limited = digits.slice(0, 11);

  // Apply formatting progressively
  if (limited.length <= 3) {
    return limited;
  }
  if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  }
  if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  }
  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
}

/**
 * Removes formatting from a CPF string, returning only digits.
 * Used before sending CPF to API.
 *
 * @param value - Formatted CPF string (XXX.XXX.XXX-XX)
 * @returns Raw CPF string with only digits (11 characters max)
 *
 * @example
 * unformatCPF("123.456.789-01") // "12345678901"
 * unformatCPF("123.456")        // "123456"
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Validates a CPF using the Brazilian CPF verification algorithm.
 * Checks both the format and the verification digits.
 *
 * @param cpf - CPF string (formatted or unformatted)
 * @returns true if valid, false otherwise
 *
 * @example
 * validateCPF("529.982.247-25") // true
 * validateCPF("111.111.111-11") // false (repeated digits)
 * validateCPF("123.456.789-01") // false (invalid check digits)
 */
export function validateCPF(cpf: string): boolean {
  // Remove formatting
  const digits = cpf.replace(/\D/g, "");

  // Must have exactly 11 digits
  if (digits.length !== 11) {
    return false;
  }

  // Reject CPFs with all identical digits (e.g., 111.111.111-11)
  if (/^(\d)\1{10}$/.test(digits)) {
    return false;
  }

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(digits.charAt(9))) {
    return false;
  }

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(digits.charAt(10))) {
    return false;
  }

  return true;
}
