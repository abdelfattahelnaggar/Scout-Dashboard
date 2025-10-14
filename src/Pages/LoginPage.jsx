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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formSchema } from "../Schemas/loginScheme";
import { Helmet } from "react-helmet";
import { Lock, Mail } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";

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
    <>
      <Helmet>
        <title>Login | Scout Dashboard</title>
        <meta
          name="description"
          content="Login to your dashboard to manage your scout website."
        />
        <meta
          name="keywords"
          content="scout, dashboard, login, admin, moderator"
        />
        <meta name="apple-mobile-web-app-title" content="Scout Dashboard" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Helmet>
      <div className="relative w-full h-dvh flex items-center justify-center overflow-hidden ">
        <FloatingLogos />
        <CurvedLines />
        <div className=" h-fit flex flex-col items-center justify-center w-11/12 sm:w-full max-w-xl text-primary-text dark:text-primary-text-dark ">
          <Card className="relative font-kodchasan bg-transparent shadow-none border-none w-full sm:max-w-md mb-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Login To Your Dashboard
              </CardTitle>
              <CardDescription className="text-lg font-light">
                Admin & Moderators dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <FieldGroup className="flex flex-col gap-3" >
                  <section className="flex flex-col gap-6">
                    {/* Email Input */}
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="flex flex-col gap-2"
                        >
                          <FieldLabel htmlFor="login-email">Email</FieldLabel>
                          <InputGroup className="dark:bg-input-color-dark bg-input-color h-12 border-none rounded-2xl">
                            <InputGroupAddon className="me-0.5">
                              <Mail />
                            </InputGroupAddon>
                            <InputGroupInput
                              {...field}
                              id="login-email"
                              type="email"
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your email"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    {/* Password Input */}
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="flex flex-col gap-2"
                        >
                          <FieldLabel htmlFor="login-password">
                            Password
                          </FieldLabel>
                          <InputGroup className="dark:bg-input-color-dark bg-input-color h-12 border-none rounded-2xl">
                            <InputGroupAddon className="me-0.5">
                              <Lock />
                            </InputGroupAddon>
                            <InputGroupInput
                              {...field}
                              id="login-password"
                              type="password"
                              placeholder="Enter your password"
                              aria-invalid={fieldState.invalid}
                              autoComplete="off"
                            />
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </section>
                  {/* Remember Me Checkbox */}
                  <Field
                    orientation="horizontal"
                    className="items-center gap-2 flex"
                  >
                    <Checkbox
                      id="remember"
                      className="rounded-sm transition-all duration-initial data-[state=unchecked]:border-gray-500 data-[state=checked]:bg-primary-button data-[state=checked]:border-primary-button dark:data-[state=checked]:bg-primary-button-dark dark:data-[state=checked]:border-primary-button-dark "
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-bold cursor-pointer"
                    >
                      Remember me later
                    </Label>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  className="bg-primary-button dark:bg-primary-button-dark  hover:bg-primary-button/85 dark:hover:bg-primary-button-dark/85 text-sm text-primary-text w-full"
                  form="login-form"
                >
                  Get Started
                </Button>
              </Field>
            </CardFooter>
          </Card>
          <section className="toggle-container flex items-center w-full justify-around my-2">
            <DarkModeToggle />
          </section>
        </div>
      </div>
    </>
  );
}
