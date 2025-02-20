"use client";

import React, { useTransition } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/shared/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseCreateAction } from "../actions";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";

const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const CreateCourseForm = ({
  revalidatePagePath,
  className,
}: {
  revalidatePagePath: string;
  className: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          startTransition(async () => {
            await courseCreateAction(revalidatePagePath, data);
          });
        })}
        className={cn(className, "space-y-8")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="название..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="описание..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
