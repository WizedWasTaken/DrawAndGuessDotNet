import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Logo from "@/components/Logo";

export default function Header() {
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
      </section>
      <section className="z-10 gap-5">
        <Button size="default" asChild>
          <Link href="/sign-in">Log ind</Link>
        </Button>
        <Button size="default" asChild>
          <Link href="/sign-up">Opret bruger</Link>
        </Button>
        s
        <ThemeToggle />
      </section>
    </header>
  );
}
