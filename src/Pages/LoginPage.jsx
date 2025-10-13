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
      <div className="relative w-full h-dvh flex items-center justify-center overflow-hidden">
        <FloatingLogos />
        <CurvedLines />

        <Card className="relative font-kodchasan bg-transparent shadow-none border-none w-full sm:max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">
              Login To Your Dashboard
            </CardTitle>
            <CardDescription>Admin & Moderators dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <FieldGroup>
                {/* Email Input */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-email">Email</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-password">Password</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <Lock className="w-5 h-5" />
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

                {/* Remember Me Checkbox */}
                <Field orientation="horizontal" className="items-center">
                  <Checkbox 
                    id="remember" 
                    className="data-[state=checked]:bg-[#BDFF19] data-[state=checked]:border-[#BDFF19] data-[state=checked]:text-gray-50" 
                  />
                  <Label htmlFor="remember" className="text-sm  cursor-pointer">
                    Remember me
                  </Label>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="submit"
                className="bg-[#BDFF19] hover:bg-[#BDFF19]/85 text-sm text-gray-50 w-full"
                form="login-form"
              >
                Get Started
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
