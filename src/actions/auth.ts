"use server";

import { loginSchema, registerSchema } from "@/lib/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./user";
import { prisma } from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";


export const login = async (formData: z.infer<typeof loginSchema>) => {
  const validatedData = loginSchema.safeParse(formData);

  if (!validatedData.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: error.message };
        default:
          return { error: "something went wrong !" };
      }
    }
    throw error;
  }
};

export const register = async (formData: z.infer<typeof registerSchema>) => {
  const validatedData = registerSchema.safeParse(formData);

  if (!validatedData.success) {
    return { error: "Invalid Fields" };
  }

  const user = await getUserByEmail(validatedData.data.email);

  if (user) {
    return { error: "email already exists" };
  }

  const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: validatedData.data.name,
      email: validatedData.data.email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    return { error: "Something went wrong !" };
  }

  return { success: "email sent" };
};

export const logOut = async () => {  
  await signOut()  
};
