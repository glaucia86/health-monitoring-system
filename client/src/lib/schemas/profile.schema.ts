import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'Nome deve ter no mínimo 2 caracteres',
    })
    .refine((val) => !val || /^[a-zA-ZÀ-ÿ\s'-]+$/.test(val), {
      message: 'Nome deve conter apenas letras',
    }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: 'Telefone deve ter pelo menos 10 dígitos',
    }),
  address: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 500, {
      message: 'Endereço não pode ter mais de 500 caracteres',
    }),
  emergencyContact: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 100, {
      message: 'Nome do contato não pode ter mais de 100 caracteres',
    }),
  emergencyPhone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: 'Telefone de emergência deve ter pelo menos 10 dígitos',
    }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
