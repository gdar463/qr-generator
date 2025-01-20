"use client";
import { QRCodeSVG } from "qrcode.react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { qrSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QRCode {
  hidden: boolean;
  content: string;
  error: string;
  version?: number;
}

export default function HomePage() {
  const [qr, setQr] = useState({
    hidden: true,
    content: "",
    error: "L",
  } as QRCode);

  const form = useForm<z.infer<typeof qrSchema>>({
    resolver: zodResolver(qrSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof qrSchema>) {
    setQr({
      hidden: false,
      content: values.content,
      error: values.error,
    });
  }

  return (
    <div className="m-4 text-lg">
      <h1 className="mb-3 text-4xl font-bold">Qr Generator</h1>
      <main className="flex min-h-screen flex-col space-y-4">
        <Form {...form}>
          <form
            className="max-w-80 space-y-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="magic" {...field} />
                  </FormControl>
                  <FormDescription>The content of the qr code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="error"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Error Correction</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Low (default)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="L">Low (default)</SelectItem>
                      <SelectItem value="M">Medium</SelectItem>
                      <SelectItem value="Q">Quartile</SelectItem>
                      <SelectItem value="H">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The level of error correction
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-1" type="submit">
              Generate
            </Button>
          </form>
        </Form>
        {qr.hidden ? (
          ""
        ) : (
          <QRCodeSVG
            value={qr.content}
            minVersion={qr.version !== undefined ? qr.version : 1}
            level={(qr.error as "L", "M", "Q", "H")}
            marginSize={2}
            size={256}
          />
        )}
      </main>
    </div>
  );
}
