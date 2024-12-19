import { Brush } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Brush size={24} />
      <span className="text-xl font-bold">Draw & Guess</span>
    </Link>);
}
