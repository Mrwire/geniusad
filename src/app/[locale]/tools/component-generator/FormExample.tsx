'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography, Input, Form } from '@/components/atoms/shadcn-adapters';

// Définition du schéma de validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Adresse email invalide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormExample() {
  // Initialisation du formulaire avec react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Fonction de soumission du formulaire
  const onSubmit = (values: FormValues) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-card rounded-lg shadow-md">
      <Typography variant="h3" className="mb-6">
        Formulaire de contact avec Shadcn UI
      </Typography>

      <Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field
          name="name"
          control={form.control}
        >
          {({ field }) => (
            <Form.Item>
              <Form.Label required>Nom</Form.Label>
              <Form.Control>
                <Input 
                  placeholder="Votre nom" 
                  error={!!form.formState.errors.name} 
                  fullWidth 
                  {...field} 
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        </Form.Field>

        <Form.Field
          name="email"
          control={form.control}
        >
          {({ field }) => (
            <Form.Item>
              <Form.Label required>Email</Form.Label>
              <Form.Control>
                <Input 
                  placeholder="votre@email.com" 
                  error={!!form.formState.errors.email}
                  fullWidth
                  startAdornment={<EmailIcon />}
                  {...field} 
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        </Form.Field>

        <Form.Field
          name="message"
          control={form.control}
        >
          {({ field }) => (
            <Form.Item>
              <Form.Label required>Message</Form.Label>
              <Form.Control>
                <textarea
                  className={`w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ${
                    !!form.formState.errors.message ? 'border-destructive' : ''
                  }`}
                  placeholder="Votre message"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
              <Form.Description>
                10 caractères minimum
              </Form.Description>
            </Form.Item>
          )}
        </Form.Field>

        <div className="mt-6 flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.reset()}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            loading={form.formState.isSubmitting}
          >
            Envoyer
          </Button>
        </div>
      </Form.Root>
    </div>
  );
}

// Icône d'email simple
function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
} 