"use client";

import { useState, useEffect, useRef } from "react";
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
import { getSignature } from "@/app/actions/user";
import { useSession } from "next-auth/react";

async function verifySignature(email: string, signature: string) {
  const userSignature = await getSignature(email);
  if (userSignature === signature) {
    toast.success("Signature found");
  } else {
    toast.error("Signature not found");
  }
}

export default function PDFVerifypage() {
  const { data: session } = useSession();
  const [signature, setSignature] = useState<string>("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () =>
              await verifySignature(session?.user?.email!, signature)
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SomePage() {
  useEffect(() => {        const container = containerRef.current;})

  ;

  return <div></div>;
}
