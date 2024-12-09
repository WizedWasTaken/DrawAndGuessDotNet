import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opret bruger</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>Opret en bruger for at kunne deltage i spillet.</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground ">
          Har du ikke en konto?{" "}
          <Link href="/sign-up" className="">
            Opret en her
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
