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
  const formSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6),
  });

  return <h1>Schema</h1>;
}
