import type { Metadata } from "next";
import "./globals.scss";

// Contexts
import { SignalRProvider } from "@/lib/contexts/SignalRContext";

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
          <header className="flex gap-5 text-lg justify-center items-center">
            <a href="/">Forside</a>
            <a href="/test">Test</a>
          </header>
          <main className="flex flex-grow flex-col">{children}</main>
          <footer>
            <h1>Footer</h1>
          </footer>
        </SignalRProvider>
      </body>
    </html>
  );
}
