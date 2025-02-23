import Image from "next/image";

import { SocialLogin } from "@/features/auth/components/social-login";
import { SignInForm } from "@/features/auth/components/sign-in-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-black">
            <div className="w-full max-w-[450px]">
                <div className="w-full h-48 relative mb-4">
                    <Image
                        src="/auth.svg"
                        alt="Auth svg"
                        fill
                        className="object-cover"
                    />
                </div>
                <Card className="w-full border-0 shadow-lg">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-semibold tracking-tight text-black dark:text-white">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-neutral-600 dark:text-neutral-400">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <SignInForm />
                        <SocialLogin />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}