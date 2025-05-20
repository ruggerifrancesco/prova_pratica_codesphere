"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Homepage () {
    const router = useRouter()
    
    return (
        <div className="grid place-items-center h-screen">
            <div className="text-center flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Codesphere F.Ruggeri Prova</h1>
            <div className="flex gap-3 justify-center">
                <Button onClick={() => router.push("/sign-in")}>Accedi</Button>
                <Button onClick={() => router.push("/sign-up")}>Registrati</Button>
            </div>
            </div>
        </div>
    )
}