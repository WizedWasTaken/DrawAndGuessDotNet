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

// Schema
import { signUpSchema } from "@/lib/schemas/authSchemas";
import { toast } from "@/lib/hooks/use-toast";
import { callApi } from "@/lib/callApi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpFormProps {
  className?: string;
}

export default function SignUpForm({ className = "" }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      setIsDisabled(true);
      toast({
        title: "Opret Konto",
        description: "Opretter din konto..."
      });

      const apiRes = await callApi("/auth/Register",
        {
          method: "POST",
          body: JSON.stringify({
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        }
      )

      if (!apiRes.isSuccessful) {
        toast({
          title: "Opret Konto",
          description: "Kunne ikke oprette din konto."
        })
        throw new Error("Couldn't create account. ")
      }

      toast({
        title: "Opret Konto",
        description: "Logger dig nu ind på din konto."
      });

      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/profile"
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

        router.push("/profile");
      }
    } catch (error: any) {
      toast({
        title: "Opret konto",
        description: error.message
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Navn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Adgangskode</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Adgangskode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gentag adgangskode</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Gentag adgangskode"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isDisabled}>Opret konto</Button>
      </form>
    </Form>
  );
}
