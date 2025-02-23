import Link from "next/link";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function NavActions() {
    return (
        <div className="flex items-center space-x-1 sm:space-x-3">
            <ModeToggle />
            <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="ml-2" asChild>
                <Link href="/sign-up">Sign Up</Link>
            </Button>
        </div>
    );
}