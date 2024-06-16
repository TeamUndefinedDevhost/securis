"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUserById = async (
  id: Prisma.UserFindUniqueArgs["where"]["id"],
  options?: { select?: Prisma.UserFindUniqueArgs["select"] }
) => {
  const user = await prisma.user.findUnique({
    where: { id },
    ...options,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUserByEmail = async (
  email: Prisma.UserFindUniqueArgs["where"]["email"],
  options?: { select?: Prisma.UserFindUniqueArgs["select"] }
) => {
  const user = await prisma.user.findUnique({
    where: { email },
    ...options,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export const uploadImage = async (
  id: Prisma.UserUpdateArgs["where"]["id"],
  newImage: string
) => {
  const user = await getUserById(id, { select: { images: true } });
  if (!user) throw new Error("User not found");

  const updatedImages = [...(user.images || []), newImage];

  return await prisma.user.update({
    where: { id },
    data: { images: updatedImages },
  });
};

export const saveEsignature = async (
  id: Prisma.UserUpdateArgs["where"]["id"],
  esignature: string
) => {
  return await prisma.user.update({
    where: { id },
    data: { esignature },
  });
};
