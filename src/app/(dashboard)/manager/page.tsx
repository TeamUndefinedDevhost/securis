"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getErrorMessage } from "@/lib/error";
import { useUploadFile } from "@/hooks/useUploadThing";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "@/components/ui/file-uploader";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { savePDF } from "@/app/actions/user";

const schema = z.object({
  email: z.string().email(),
  pdf: z.array(z.instanceof(File)).nonempty().max(1),
});

type Schema = z.infer<typeof schema>;

export default function ManagerDashboardPage() {
  const [loading, setLoading] = React.useState(false);
  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    "pdfUploader",
    { defaultUploadedFiles: [] }
  );

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      pdf: undefined,
    },
  });

  async function onSubmit(input: Schema) {
    setLoading(true);

    toast.promise(uploadFiles(input.pdf), {
      loading: "Uploading pdf...",
      success: async () => {
        form.reset();
        setLoading(false);
        return "PDF uploaded successfully!";
      },
      error: (err: unknown) => {
        setLoading(false);
        return getErrorMessage(err);
      },
    });
  }

  return (
    <Card>
      <CardHeader className="flex text-center">
        <CardTitle>Upload PDF</CardTitle>
        <CardDescription>Upload a PDF file for user to sign.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pdf"
              render={({ field }) => (
                <div className="space-y-6 mt-3">
                  <FormItem className="w-full">
                    <FormLabel>PDF</FormLabel>
                    <FormControl>
                      <FileUploader
                        accept={{ "application/pdf": [] }}
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={8 * 1024 * 1024}
                        progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="w-fit" disabled={loading}>
              Send PDF
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
