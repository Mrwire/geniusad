import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';
import { BaseLayout } from "@/components/templates/BaseLayout";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

// This page redirects to the default locale
export default function Home() {
  redirect('/fr');
}
