"use client";

// Libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// UI
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
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
import { useState } from "react";

interface SignInFormProps {
  className?: string;
  callbackUrl?: string;
}

export default function SignInForm({
  className = "",
  callbackUrl = "/profile",
}: SignInFormProps) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      setIsDisabled(true);
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      if (res == null) {
        throw new Error("No response");
      }

      if (res.error) {
        toast({
          title: "Log Ind",
          description: res.error,
        });

        return;
      }

      if (res.ok) {
        toast({
          title: "Log Ind",
          description: "Du er nu logget ind. Hav det sjovt 🎉🎉",
        });
        router.push("/profile");

        return;
      }
    } catch (error: any) {
      toast({
        title: "Log Ind",
        description: error.message,
      });
    } finally {
      setIsDisabled(false);
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
                <PasswordInput placeholder="Adgangskode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisabled}>
          Log ind
        </Button>
      </form>
    </Form>
  );
}
