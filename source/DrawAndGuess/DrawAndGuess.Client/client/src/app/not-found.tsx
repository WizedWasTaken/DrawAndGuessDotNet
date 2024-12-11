'use client'

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Pencil, Eraser } from 'lucide-react'
import Link from "next/link"

export default function NotFound() {
    const { theme } = useTheme()

    return (
        <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
            <div className="mb-8">
                <Pencil className="inline-block w-16 h-16 mr-4 text-primary" />
                <Eraser className="inline-block w-16 h-16 text-secondary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
            <p className="text-xl mb-8">
                Looks like you've drawn outside the lines! This page doesn't exist.
            </p>
            <div className="mb-8">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="4" />
                    <circle cx="70" cy="80" r="10" fill={theme === 'dark' ? 'white' : 'black'} />
                    <circle cx="130" cy="80" r="10" fill={theme === 'dark' ? 'white' : 'black'} />
                    <path d="M 60 130 Q 100 100 140 130" fill="none" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="4" />
                </svg>
            </div>
            <Button asChild>
                <Link href="/">
                    Back to Drawing Board
                </Link>
            </Button>
        </div>
    )
}

