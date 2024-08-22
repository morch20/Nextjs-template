"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function ModeToggle() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    const handleClick = () => {
        if (resolvedTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button
                type="button"
                variant="outline"
                className="rounded-full"
                size="icon"
            />
        );
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={handleClick}
        >
            <Sun
                size={20}
                className="hidden duration-200 animate-in fade-in dark:block"
            />

            <Moon
                size={20}
                className="duration-200 animate-in fade-in dark:hidden"
            />
        </Button>
    );
}
