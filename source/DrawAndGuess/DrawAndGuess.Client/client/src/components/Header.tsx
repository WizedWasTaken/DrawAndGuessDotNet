"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSession } from "next-auth/react";
import Logo from "@/components/Logo";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex p-5 text-lg justify-between items-center relative">
      <section className="z-10">
        <Logo />
      </section>
      <section className="absolute inset-0 flex items-center justify-center gap-5">
        <Button size="default" asChild>
          <Link href="/">Forside</Link>
        </Button>
        <Button size="default" asChild>
          <Link href="/lobbies">Lobbies</Link>
        </Button>
        <Button size="default" asChild>
          <Link href="/test">Test</Link>
        </Button>
      </section>
      <section className="z-10 flex gap-5">
        {session ? (
          <>
            <Button size="default" asChild>
              <Link href="/profile">Profil</Link>
            </Button>
            <Button size="default" asChild>
              <Link href="/api/auth/signout">Log ud</Link>
            </Button>
          </>
        ) : (
          <>
            <Button size="default" asChild>
              <Link href="/sign-in">Log ind</Link>
            </Button>
            <Button size="default" asChild>
              <Link href="/sign-up">Opret bruger</Link>
            </Button>
          </>
        )}

        <ThemeToggle />
      </section>
    </header>
  );
}
