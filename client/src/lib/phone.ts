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
