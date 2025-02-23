"use client";

import type { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockIcon } from "lucide-react";

import { loginSchema } from "@/features/auth/schema";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function SignInForm() {
    const [isLoading, setIsLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            await authClient.signIn.email(
                {
                    email: values.email,
                    password: values.password,
                    callbackURL: "/dashboard",
                    rememberMe: true,
                },
                {
                    onRequest: () => {
                        setIsLoading(true);
                    },
                    onSuccess: () => {
                        window.location.href = "/dashboard";
                    },
                    onError: (ctx) => {
                        alert(ctx.error.message);
                    },
                }
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-black dark:text-white"
                >
                    Email
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center w-4 h-4">
                        @
                    </span>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        disabled={isLoading}
                        className="pl-10 h-12 bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                        autoComplete="email"
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label 
                    htmlFor="password"
                    className="text-sm font-medium text-black dark:text-white"
                >
                    Password
                </label>
                <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        disabled={isLoading}
                        className="pl-10 h-12 bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                        {...register("password")}
                    />
                </div>
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
}