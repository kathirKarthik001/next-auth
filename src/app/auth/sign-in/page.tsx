"use client";

import { useState, useTransition } from "react";
import { authSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {
  const [serverMessage, setServerMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    setServerMessage("");
    startTransition(async () => {
      try {
        // Replace this with your actual sign-in server action
        console.log("SignIn called with:", values);
        setServerMessage("Successfully signed in!"); // fake response
      } catch (error: any) {
        setServerMessage("Invalid credentials or server error.");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold">Sign In</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Server Message */}
          {serverMessage && (
            <p className="text-sm text-red-600">{serverMessage}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="text-sm text-center">
        Don’t have an account? <Link href={'/auth/sign-up'} className="text-blue-600 underline">Register</Link>
      </div>

      {/* Social Buttons */}
      <div className="flex items-center gap-3 mt-4 ">
        <Button variant="outline" className="w-1/2 flex items-center justify-center gap-2">
          <FcGoogle size={20} /> Google
        </Button>
        <Button variant="outline" className="w-1/2  flex items-center justify-center gap-2">
          <FaGithub size={20} /> GitHub
        </Button>
      </div>
    </div>
  );
}
