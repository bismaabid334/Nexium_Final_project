import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Toaster } from 'sonner';

export const metadata = {
  title: "Mental Health Tracker",
  description: "Track your mental health mindfully",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnimatedWrapper>
            <Navbar />
            <main className="p-4">{children}</main>
            <Toaster richColors />
          </AnimatedWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}