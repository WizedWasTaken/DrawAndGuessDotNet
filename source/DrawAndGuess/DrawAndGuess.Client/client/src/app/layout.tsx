import type { Metadata } from "next";
import "./globals.scss";

// Contexts
import { SignalRProvider } from "@/lib/contexts/SignalRContext";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Tegn og gæt",
  description: "Multiplayer tegn og gæt lavet af Noah A. Nielsen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen flex flex-grow flex-col`}>
        <SignalRProvider url="https://localhost:7282/lobbyHub">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex flex-grow flex-col">{children}</main>
            <footer>
              <h1>Footer</h1>
            </footer>
          </ThemeProvider>
        </SignalRProvider>
      </body>
    </html>
  );
}
