import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Glacier AI | AI Resume Analyzer',
  description: 'Elevate your resume with AI-powered feedback and optimization.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body suppressHydrationWarning className="font-body text-on-background antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
