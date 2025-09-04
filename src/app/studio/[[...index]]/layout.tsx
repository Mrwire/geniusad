export const metadata = {
  title: 'Genius Ad District CMS',
  description: 'Sanity Content Studio for Genius Ad District',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 