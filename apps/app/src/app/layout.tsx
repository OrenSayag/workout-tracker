import '@workout-tracker/ui/globals.css';

export const metadata = {
    title: 'Workout Tracker',
    description: 'Workout Tracker',
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
