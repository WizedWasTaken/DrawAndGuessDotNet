import type { Metadata } from "next";
import "./globals.scss";

// Contexts
import { SignalRProvider } from "@/lib/contexts/SignalRContext";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechnicalInformation from "@/components/TechnicalInformation";

export const metadata: Metadata = {
  title: "Tegn og gæt",
  description: "Multiplayer tegn og gæt lavet af Noah A. Nielsen",
};

const SIGNALR_URL =
  process.env.NEXT_PUBLIC_SIGNALR_URL ||
  "https://drawandguess-signalr.noahnielsen.dk/lobbyHub";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased min-h-screen flex flex-grow flex-col dark`}>
        <SignalRProvider url={SIGNALR_URL}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex flex-grow flex-col">{children}</main>
            <Footer />
            <div className="fixed bottom-0 p-5">
              <TechnicalInformation />
            </div>
          </ThemeProvider>
        </SignalRProvider>
      </body>
    </html>
  );
}
