import { formatPhoneNumberIntl } from 'react-phone-number-input';

export const formatPhone = (phone: string | undefined | null) => {
  if (!phone) return 'Não informado';

  try {
    const trimmed = phone.trim();

    if (trimmed.startsWith('+')) {
      return formatPhoneNumberIntl(trimmed) || trimmed;
    }

    const digitsOnly = trimmed.replace(/\D/g, '');
    if (!digitsOnly) return 'Não informado';

    const intl = formatPhoneNumberIntl(digitsOnly);
    return intl || phone;
  } catch {
    return phone;
  }
};

/**
 * Format Brazilian phone number as user types
 * Handles both landline (10 digits) and mobile (11 digits) formats
 * 
 * @example
 * formatPhoneBR('11999998888') // returns '(11) 99999-8888'
 * formatPhoneBR('1133334444')  // returns '(11) 3333-4444'
 */
export function formatPhoneBR(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to 11 digits (max for Brazilian mobile)
  const limited = digits.slice(0, 11);
  
  // Apply mask based on length
  if (limited.length <= 2) {
    return limited.length > 0 ? `(${limited}` : '';
  }
  
  if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  
  if (limited.length <= 10) {
    // Landline format: (XX) XXXX-XXXX
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  }
  
  // Mobile format: (XX) XXXXX-XXXX
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
}

/**
 * Remove formatting from Brazilian phone number
 * 
 * @example
 * unformatPhoneBR('(11) 99999-8888') // returns '11999998888'
 */
export function unformatPhoneBR(value: string): string {
  return value.replace(/\D/g, '');
}
