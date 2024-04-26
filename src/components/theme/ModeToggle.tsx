"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme("light")}
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme light</span>
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme("dark")}
            >
                <Moon className="absolute h-[1.2rem]" />
                <span className="sr-only">Toggle theme dark</span>
            </Button>
        </>
    );
}
