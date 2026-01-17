"use server";

import { prisma } from "@/lib/prisma";

const getGoogleUserById = async (providerAccountId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        provider: "google",
        providerAccountId: providerAccountId,
      },
      include: {
        user: true,
      },
    });

    if (!account) {
      throw new Error("Google account not found");
    }

    return account.user;
  } catch (error) {
    console.error("Error fetching Google user:", error);
    throw error;
  }
};

export default getGoogleUserById;