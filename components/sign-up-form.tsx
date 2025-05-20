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
import { useState } from "react"
import { IconLoader2 } from "@tabler/icons-react"

export function SignUpForm({
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
          <CardTitle>Registra il tuo account</CardTitle>
          <CardDescription className="mt-2">
            Inserisci la tua email nei campi quà sotto per registrare il tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Mario Rossi"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder=""
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmation_password">Conferma password</Label>
                <Input
                  id="confirmation_password"
                  type="password"
                  placeholder=""
                  required
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <IconLoader2 className="animate-spin" /> : "Registrati"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Hai già un account?{" "}
              <a href="/sign-in" className="underline underline-offset-4">
                Loggati ora
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
