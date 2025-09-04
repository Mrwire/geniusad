import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { ThemeProvider } from '@/components/theme'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Genius Ad District',
  description: 'Agence de design et de communication créative',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta charSet="utf-8" />
        {/* Storage access patch script to prevent errors in sandboxed environments */}
        <Script id="storage-access-patch" strategy="beforeInteractive">
          {`
          // Storage Access Patch - Prevents errors in sandboxed environments
          (function() {
            if (typeof window !== 'undefined') {
              // Create memory fallbacks
              const memoryStorage = {
                local: {},
                session: {}
              };

              // Safely patch localStorage
              try {
                window.localStorage.getItem('test');
              } catch (e) {
                console.info('[Storage Patch] Patching localStorage');
                Object.defineProperty(window, 'localStorage', {
                  value: {
                    getItem: function(key) {
                      try { return window.localStorage.getItem(key); } 
                      catch (e) { return memoryStorage.local[key] || null; }
                    },
                    setItem: function(key, value) {
                      try { window.localStorage.setItem(key, value); } 
                      catch (e) { memoryStorage.local[key] = value; }
                    },
                    removeItem: function(key) {
                      try { window.localStorage.removeItem(key); } 
                      catch (e) { delete memoryStorage.local[key]; }
                    },
                    clear: function() {
                      try { window.localStorage.clear(); } 
                      catch (e) { memoryStorage.local = {}; }
                    },
                    key: function(index) {
                      try { return window.localStorage.key(index); } 
                      catch (e) { return Object.keys(memoryStorage.local)[index] || null; }
                    },
                    get length() {
                      try { return window.localStorage.length; } 
                      catch (e) { return Object.keys(memoryStorage.local).length; }
                    }
                  }
                });
              }

              // Safely patch sessionStorage
              try {
                window.sessionStorage.getItem('test');
              } catch (e) {
                console.info('[Storage Patch] Patching sessionStorage');
                Object.defineProperty(window, 'sessionStorage', {
                  value: {
                    getItem: function(key) {
                      try { return window.sessionStorage.getItem(key); } 
                      catch (e) { return memoryStorage.session[key] || null; }
                    },
                    setItem: function(key, value) {
                      try { window.sessionStorage.setItem(key, value); } 
                      catch (e) { memoryStorage.session[key] = value; }
                    },
                    removeItem: function(key) {
                      try { window.sessionStorage.removeItem(key); } 
                      catch (e) { delete memoryStorage.session[key]; }
                    },
                    clear: function() {
                      try { window.sessionStorage.clear(); } 
                      catch (e) { memoryStorage.session = {}; }
                    },
                    key: function(index) {
                      try { return window.sessionStorage.key(index); } 
                      catch (e) { return Object.keys(memoryStorage.session)[index] || null; }
                    },
                    get length() {
                      try { return window.sessionStorage.length; } 
                      catch (e) { return Object.keys(memoryStorage.session).length; }
                    }
                  }
                });
              }
              console.info('[Storage Patch] Storage access patch initialized');
            }
          })();
          `}
        </Script>
      </head>
      <body className="min-h-screen antialiased font-sans bg-black text-white" suppressHydrationWarning>
        <ThemeProvider defaultTheme="genius">
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
