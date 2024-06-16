import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { uploadImage } from "@/app/actions/user";

const file = createUploadthing();

export const uploadRouter = {
  pdfUploader: file({
    pdf: {
      maxFileSize: "8MB",
      minFileCount: 1,
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      const user = (await auth())?.user;
      if (!user) throw new UploadThingError("Unauthorized");
      return { id: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // await saveEsignature(metadata.id, file.url);
    }),
  imageUploader: file({
    image: {
      maxFileSize: "2MB",
      minFileCount: 2,
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const user = (await auth())?.user;
      if (!user) throw new UploadThingError("Unauthorized");
      return { id: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await uploadImage(metadata.id, file.url);
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
