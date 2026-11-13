import type { Metadata } from 'next';
import { AdminShell } from '@/components/AdminShell';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata('Admin | UNIKMO');

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
