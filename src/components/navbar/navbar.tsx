import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "@/components/navbar/mobile-menu";
import { NavLinks } from "@/components/navbar/nav-links";
import { NavActions } from "@/components/navbar/nav-actions";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <MobileMenu />
                    <Link href={"/"} className="flex items-center">
                        <Image 
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </Link>
                </div>
                
                <div className="hidden md:flex flex-1 items-center justify-center">
                    <NavLinks />
                </div>
                
                <div className="flex items-center">
                    <NavActions />
                </div>
            </div>
        </header>
    );
}