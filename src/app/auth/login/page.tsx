"use client";

import { useState, useTransition } from "react";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { login } from "@/actions/auth";
import SocialProviders from "@/components/SocialProviders";

export default function SignInPage() {
  const [serverMessage, setServerMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setServerMessage("");
    startTransition(async () => {
      try {
        const data = await login( values );

        if( data?.error ){
          setServerMessage(data.error);
        }

      } catch (error: any) {
        setServerMessage(error.message);
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
        Don’t have an account? <Link href={'/auth/register'} className="text-blue-600 underline">Register</Link>
      </div>

      {/* Social Buttons */}
      <SocialProviders/>

    </div>
  );
}
