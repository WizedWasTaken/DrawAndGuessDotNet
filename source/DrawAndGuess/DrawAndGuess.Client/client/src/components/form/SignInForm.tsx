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
import { navigation }

// Auth
import { signIn } from "next-auth/react";

interface SignUpFormProps {
  className?: string;
}

export default function SignUpForm({ className = "" }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      console.error("Error signing in:", res.error);
    }

    if (res?.ok) {
      console.log("Signed in successfully");
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
