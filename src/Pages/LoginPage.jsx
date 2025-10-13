import FloatingLogos from "../components/FloatingLogos";
import CurvedLines from "../components/CurvedLines";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formSchema } from "../Schemas/loginScheme";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      },
    });
  }

  return (
    <div>
      <div className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <FloatingLogos />
        <CurvedLines />

        <Card className="relative font-kodchasan w-full sm:max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Login To Your Dashboard</CardTitle>
            <CardDescription>Admin & Moderators dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-email">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="login-email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Email"
                        autoComplete="email"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-password">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="login-password"
                        type="password"
                        placeholder="Password"
                        aria-invalid={fieldState.invalid}
                        autoComplete="current-password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button type="submit" className="bg-[#BDFF19] w-full" form="login-form">
                Login
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}