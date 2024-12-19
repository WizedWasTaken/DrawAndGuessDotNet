// Components
import SignUpForm from "@/app/(auth)/sign-up/Components/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Next
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Opret bruger</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>Opret en bruger for at kunne deltage i spillet.</p>
        </CardDescription>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground ">
          Har du allerede en konto?{" "}
          <Link href="/sign-in" className="">
            Log ind her
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
