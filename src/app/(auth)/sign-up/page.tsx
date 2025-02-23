import Image from "next/image";

import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { SocialLogin } from "@/features/auth/components/social-login";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
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
                            Create an account
                        </CardTitle>
                        <CardDescription className="text-neutral-600 dark:text-neutral-400">
                            Sign up to get started with our platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <SignUpForm />
                        <SocialLogin />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}