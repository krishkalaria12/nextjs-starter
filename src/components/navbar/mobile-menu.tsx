"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { 
    Sheet, 
    SheetContent, 
    SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import Image from "next/image";

export function MobileMenu() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    
    const routes = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/resources", label: "Resources" },
    ];
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center mb-8 mt-4" onClick={() => setOpen(false)}>
            <Image 
                src={Icons.logo}
                alt="Logo"
                width={32}
                height={32}
                className="mr-2"
                priority
            />
            <span className="font-bold text-xl">Acme Inc</span>
          </Link>
          <nav className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-2 py-1 text-lg transition-colors hover:text-primary",
                  pathname === route.href ? "font-medium text-primary" : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="px-2 py-1 text-lg hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}