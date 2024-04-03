"use client";

import { EditUserProfileSchema } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  user: any;
  onUpdate?: any;
};

const ProfileForm = ({ user, onUpdate }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: user.email,
    name: user.name,
  });
  const formValues = form.watch();

  const handleSubmit = async (
    values: z.infer<typeof EditUserProfileSchema>
  ) => {
    setLoading(true);
    try {
      await onUpdate(values.name);
      setInitialValues(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset({
      email: user.email,
      name: user.name,
    });
  }, [user]);
  
  useEffect(() => {
    setIsFormChanged(
      JSON.stringify(formValues) !== JSON.stringify(initialValues)
    );
  }, [formValues]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 "
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          disabled={loading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User full name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={true}
                  placeholder="Email"
                  type="email"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="self-start hover:bg-[#2f006b] hover:text-white"
          disabled={!isFormChanged}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save user profile"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
