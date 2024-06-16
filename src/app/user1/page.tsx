"use client";

import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import { useUploadFile } from "@/hooks/useUploadThing";
import { useSession } from "next-auth/react";
import {
  getSignature,
  getUserByEmail,
  saveEsignature,
} from "@/app/actions/user";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const compute = async (email: string) => {
  const user = await getUserByEmail(email);
  const response = await fetch(
    "https://3903-2401-4900-65b1-dd9f-444b-876e-9810-2b47.ngrok-free.app/authentication",
    {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  // toast(data);
  await saveEsignature(email, data["hash_key"]);
};

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const { uploadFiles, progresses, uploadedFiles, isUploading } =
    useUploadFile("imageUploader");

  const { data: signature } = useQuery({
    queryKey: ["signature"],
    queryFn: async () => getSignature(session?.user?.email!),
    enabled: !!session?.user?.email,
  });
  return (
    <>
      {<h1>Welcome, {session?.user?.name}!</h1>}
      {signature && signature}
      <FileUploader
        multiple={true}
        minFiles={1}
        maxFiles={1}
        progresses={progresses}
        onUpload={uploadFiles}
        disabled={isUploading}
      />
      <Button
        onClick={async () => await compute(session?.user?.email!)}
        disabled={isUploading}
      >
        Verify
      </Button>
    </>
  );
}
