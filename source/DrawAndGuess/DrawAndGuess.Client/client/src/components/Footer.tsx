"use client";

import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex p-5 text-lg justify-between items-center relative">
      <section></section>
      <section className="absolute font-bold inset-0 flex items-center justify-center">
        Made with ❤ by Noah Nielsen
      </section>
      <section className="z-10">
        <a href="https://github.com/WizedWasTaken/DrawAndGuessDotNet">
          <Github />
        </a>
      </section>
    </footer>
  );
}
