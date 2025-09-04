import { z } from 'zod';

export const formSchema = z.object({
  componentName: z.string().min(2, {
    message: "Le nom du composant doit contenir au moins 2 caractères."
  }),
  componentType: z.enum(['button', 'card', 'form', 'navigation', 'hero', 'gallery', 'modal', 'custom']),
  description: z.string().optional(),
  styleFlavor: z.enum(['minimal', 'frosted', 'gradient', 'outlined', 'shadowed']),
  isAccessible: z.boolean().default(true),
  includeAnimation: z.boolean().default(false),
  customProps: z.string().optional()
});

export type FormValues = z.infer<typeof formSchema>; 