import type { Metadata } from 'next';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'stream-chat-react/dist/css/v2/index.css';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Slack Clone',
  description:
    "Slack is a cloud-based messaging app that helps teams communicate and collaborate. It's designed to help organizations work more flexibly and inclusively, and can be used by teams of all sizes.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
        sizes: '32x32',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="text-white antialiased">
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                duration: 4000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
