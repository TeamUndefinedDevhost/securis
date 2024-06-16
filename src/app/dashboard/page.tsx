"use client";

import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import { useUploadFile } from "@/hooks/useUploadThing";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/app/actions/user";

const compute = async (email: string) => {
  const user = await getUserByEmail(email);
  await fetch(
    "https://3903-2401-4900-65b1-dd9f-444b-876e-9810-2b47.ngrok-free.app/compute",
    {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const { uploadFiles, progresses, uploadedFiles, isUploading } =
    useUploadFile("imageUploader");
  return (
    <>
      <FileUploader
        multiple={true}
        minFiles={5}
        maxFiles={10}
        progresses={progresses}
        onUpload={uploadFiles}
        disabled={isUploading}
      />
      <Button onClick={async () => await compute(session?.user?.email!)}>
        Compute
      </Button>
    </>
  );
}
