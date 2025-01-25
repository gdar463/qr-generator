"use client";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { historySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRVersion from "./lib";
import { Input } from "@/components/ui/input";

export type HistoryQrCode = {
  content: string;
  version: string;
  qrVersion: number;
  margin: number;
};

export default function HistoryPage() {
  const [qr, setQr] = useState({
    content: "",
    version: "main",
    qrVersion: 1,
    margin: 0,
  } as HistoryQrCode);

  const form = useForm<z.infer<typeof historySchema>>({
    resolver: zodResolver(historySchema),
    defaultValues: {
      qrVersion: 1,
      margin: 0,
    },
  });

  function onSubmit(values: z.infer<typeof historySchema>) {
    setQr({
      content: values.content,
      version: values.version,
      qrVersion: values.qrVersion,
      margin: values.margin,
    } as HistoryQrCode);
  }

  return (
    <div className="m-4 text-lg">
      <main className="flex min-h-screen flex-col space-y-4">
        <Form {...form}>
          <form
            className="max-w-80 space-y-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>QR Render Version</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Main" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="main">Main</SelectItem>
                      <SelectItem value="fixed_array">
                        Old Fixed Array
                      </SelectItem>
                      <SelectItem value="v0.1">Main Bullseye only</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qrVersion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>QR Version</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="margin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margin</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-1" type="submit">
              Load
            </Button>
          </form>
        </Form>
        <QRVersion qr={qr} />
      </main>
    </div>
  );
}
