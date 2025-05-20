"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import React, { useState } from "react"
import { IconLoader2 } from "@tabler/icons-react"

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout((): void => {
      redirect("/dashboard")
    }, 3000)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Loggati nel tuo account</CardTitle>
          <CardDescription className="mt-2">
            Inserisci la tua email nei campi quà sotto per accedere al tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="on"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/sign-in?forgot_password=true"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Hai dimenticato la tua password?
                  </a>
                </div>
                <Input id="password" type="password" required autoComplete="on" />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <IconLoader2 className="animate-spin" /> : "Accedi"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Non possiedi un account?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Registrati
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
