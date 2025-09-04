import React from 'react';
import Link from 'next/link';

type User = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  company?: string;
  profileImage?: string;
};

type Translations = {
  dashboard: string;
  projects: string;
  assets: string;
  messages: string;
  approvals: string;
  meetings: string;
  settings: string;
  signOut: string;
};

interface Props {
  user: User;
  locale: string;
  translations: Translations;
}

export default function ClientSidebar({ user, locale, translations }: Props) {
  const items = [
    { href: `/${locale}/client-portal`, label: translations.dashboard },
    { href: `/${locale}/client-portal/projects`, label: translations.projects },
    { href: `/${locale}/client-portal/assets`, label: translations.assets },
    { href: `/${locale}/client-portal/messages`, label: translations.messages },
    { href: `/${locale}/client-portal/approvals`, label: translations.approvals },
    { href: `/${locale}/client-portal/meetings`, label: translations.meetings },
    { href: `/${locale}/client-portal/settings`, label: translations.settings },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {user.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.profileImage} alt={user.name || 'user'} className="h-8 w-8 rounded-full" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          )}
          <div className="text-sm">
            <div className="font-medium text-gray-900">{user.name || 'Client'}</div>
            {user.company && <div className="text-gray-500">{user.company}</div>}
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href={`/${locale}/auth/logout`}
          className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
        >
          {translations.signOut}
        </Link>
      </div>
    </aside>
  );
}

