"use client";

import { useQuery } from "@tanstack/react-query";
import { getPDFs, getSignature } from "@/app/actions/user";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

async function verifySignature(email: string, signature: string) {
  const userSignature = await getSignature(email);
  if (userSignature === signature) {
    toast.success("Signature found");
    return true;
  } else {
    toast.error("Signature not found");
    return false;
  }
}

export default function PDFsPage() {
  const { data: session } = useSession();

  const { data: pdfs } = useQuery({
    queryKey: ["pdfs"],
    queryFn: async () => getPDFs(session?.user.email!),
  });

  const router = useRouter();
  const [signature, setSignature] = useState<string>("");
  const [selectedPdfId, setSelectedPdfId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSignClick = (pdfUrl: string) => {
    const pdfId = pdfUrl!.split("/").pop()!.replace(".pdf", ""); // Extract ID from URL
    setSelectedPdfId(pdfId);
    setIsDialogOpen(true);
  };

  const handleSignatureVerification = async () => {
    const isVerified = await verifySignature(session?.user?.email!, signature);
    if (isVerified) {
      router.push(`/user/pdf/${selectedPdfId}`);
    }
    setIsDialogOpen(false); // Close the dialog after verification
  };

  return (
    <>
      {pdfs?.map((pdf, i) => (
        <div key={i}>
          <Card>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => handleSignClick(pdf)}
              >
                Sign
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Your E-Signature</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                placeholder="Enter your E-Signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignatureVerification}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
