import '@life-stats/ui/globals.css';

export const metadata = {
  title: 'Life Stats',
  description: 'Life Stats',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
