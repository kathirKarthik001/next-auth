"use server";

import prisma from "@/lib/db";

export const register = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  });
};

