"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, USERROLE } from "@prisma/client";

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
};

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
  email: Prisma.UserUpdateArgs["where"]["email"],
  esignature: Prisma.UserUpdateArgs["data"]["esignature"]
) => {
  return await prisma.user.update({
    where: { email },
    data: { esignature },
  });
};

export const savePDF = async (
  email: Prisma.UserUpdateArgs["where"]["email"],
  pdf: string
) => {
  const user = await getUserByEmail(email, { select: { pdfs: true } });
  if (!user) throw new Error("User not found");

  const updatedPdfs = [...(user.pdfs || []), pdf];

  return await prisma.user.update({
    where: { email },
    data: { pdfs: updatedPdfs },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    where: {
      role: USERROLE.USER,
    },
  });
};

export const getSignature = async (
  email: Prisma.UserFindUniqueArgs["where"]["email"]
) => {
  const user = await getUserByEmail(email, { select: { esignature: true } });
  if (!user) throw new Error("User not found");

  return user.esignature;
};

export const getPDFs = async (
  email: Prisma.UserFindUniqueArgs["where"]["email"]
) => {
  const user = await getUserByEmail(email, { select: { pdfs: true } });
  if (!user) throw new Error("User not found");

  return user.pdfs;
};
