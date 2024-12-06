"use client";

// Libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Components
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

// Call API
import { callApiAsync } from "@/lib/callApi";

// Types
import { Player } from "@/entities/player";

interface SignUpFormProps {
  className?: string;
}

export default function SignUpForm({ className = "" }: SignUpFormProps) {
  const formSchema = z
    .object({
      name: z
        .string()
        .min(4, {
          message: "Brugernavn skal være minimum 4 tegn langt",
        })
        .max(16, {
          message: "Brugernavn skal være maksimum 16 tegn langt",
        }),
      email: z.string().email({
        message: "Indtast venligst en gyldig email-adresse",
      }),
      password: z.string().min(8, {
        message: "Adgangskode skal være minimum 8 tegn lang",
      }),
      confirmPassword: z.string().min(8, {
        message: "Bekræft adgangskode skal være minimum 8 tegn lang",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Adgangskoderne stemmer ikke overens",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await callApiAsync<Player>("/Player/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(JSON.stringify(values));
      console.log("response", response);

      if (response.isSuccessful) {
        console.log("Signup successful:", response.data);
      } else {
        throw new Error("Signup failed: " + response.statusText);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-6 " + className}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brugernavn</FormLabel>
              <FormControl>
                <Input id="name" {...field} />
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
                <Input id="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Adgangskode</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bekræft adgangskode</FormLabel>
                <FormControl>
                  <Input id="confirmPassword" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Opret konto
        </Button>
      </form>
    </Form>
  );
}
