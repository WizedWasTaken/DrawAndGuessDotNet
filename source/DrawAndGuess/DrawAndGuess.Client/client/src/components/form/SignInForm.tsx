"use client";

// Libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/schemas/authSchemas";

// Client Navigation
import { useRouter } from "next/navigation";

// Auth
import { signIn } from "next-auth/react";
import { toast } from "@/lib/hooks/use-toast";

interface SignInFormProps {
  className?: string;
  callbackUrl?: string;
}

export default function SignInForm({ className = "", callbackUrl = "/profile" }: SignInFormProps) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
      callbackUrl: callbackUrl
    });

    if (res?.error) {
      // Handle error if sign-in fails
      console.error("Sign-in failed:", res.error);
      toast({
        title: "Log Ind",
        description: "Forkert brugernavn eller adgangskode. Prøv igen.",
      });
    }

    if (res?.ok) {
      toast({
        title: "Log Ind",
        description: "Du er nu logget ind. Hav det sjovt 🎉🎉",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-5 flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brugernavn</FormLabel>
              <FormControl>
                <Input placeholder="Brugernavn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adgangskode</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Adgangskode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
