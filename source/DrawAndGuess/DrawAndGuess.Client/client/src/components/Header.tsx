import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { headerButtons } from "@/lib/pages";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="flex p-5 text-lg justify-between items-center relative">
      <section className="z-10">
        <Logo />
      </section>
      <section className="absolute inset-0 flex items-center justify-center gap-5">
        {headerButtons.map((button) => (
          <Button key={button.name} size="default" asChild>
            <Link href={button.href}>{button.name}</Link>
          </Button>
        ))}
      </section>
      <section className="z-10">
        <ThemeToggle />
      </section>
    </header>
  );
}
