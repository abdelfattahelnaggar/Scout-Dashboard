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
import { useDocumentHead } from "../hooks/useDocumentHead";
import { Lock, Mail } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginApi,
  });

  // !============== Set document head ============== 
  useDocumentHead({
    title: "Login | Scout Dashboard",
    description: "Login to your dashboard to manage your scout website.",
    keywords: "scout, dashboard, login, admin, moderator",
    meta: {
      "apple-mobile-web-app-title": "Scout Dashboard",
      "apple-mobile-web-app-capable": "yes",
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit(data) {
    toast.promise(
      mutateAsync(data),
      {
        loading: "Logging in...",
        success: (response) => {
          // !============== Store token in localStorage ============== 
          if (response?.data?.token) {
            localStorage.setItem("token", response.data.token);
          }
          // !============== Store user data if available ============== 
          if (response?.data?.userDetails) {
            localStorage.setItem("user", JSON.stringify(response.data.userDetails));
          }
          
          // !============== Navigate to dashboard after successful login ============== 
          setTimeout(() => {
            navigate("/");
          }, 1000);
          
          return `Welcome back, ${response?.data?.userDetails?.fullName || "my friend"}!`;
        },
        error: (error) => {
          // Handle different error scenarios
          console.error("Login API Error:", error.response); // Log the full error response
          const message = error?.response?.data?.message || 
                         error?.message || 
                         "Login failed. Please try again.";
          return message;
        },
      }
    );
  }

  return (
    <>
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
                <FieldGroup className="flex flex-col gap-3">
                  <section className="flex flex-col gap-6">
                    {/* !============== Email Input ============== */}
                    <Controller
                      name="identifier"
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
                      className="text-sm cursor-pointer"
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
                  className="bg-primary-button cursor-pointer text-sm h-14 rounded-2xl dark:bg-primary-button-dark  hover:bg-primary-button/85 dark:hover:bg-primary-button-dark/85 text-primary-text w-full"
                  form="login-form"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Get Started"}
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
