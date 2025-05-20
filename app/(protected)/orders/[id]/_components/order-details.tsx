// export default async function OrdersDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params

//   return (
//     <div>
        
//     </div>
//   )
//   return <div>My Order: {id}</div>
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { ArrowLeft, Calendar, CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/lib/types"

interface OrderDetailProps {
  order: Order
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const [orderStatus, setOrderStatus] = useState<Order["state"]>(order.state)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = (newStatus: Order["state"]) => {
    setOrderStatus(newStatus)
  }

  const updateOrderStatus = () => {
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }

  const getStatusLabel = (status: Order["state"]) => {
    switch (status) {
      case "lavorazione":
        return "In Lavorazione"
      case "spedito":
        return "Spedito"
      case "annullato":
        return "Annullato"
      default:
        return status
    }
  }

  const getStatusBadge = (status: Order["state"]) => {
    switch (status) {
      case "lavorazione":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            In Lavorazione
          </Badge>
        )
      case "spedito":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Truck className="h-3 w-3 mr-1" />
            Spedito
          </Badge>
        )
      case "annullato":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Annullato
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: Order["state"]) => {
    switch (status) {
      case "lavorazione":
        return <Clock className="h-8 w-8 text-yellow-500" />
      case "spedito":
        return <Truck className="h-8 w-8 text-green-500" />
      case "annullato":
        return <XCircle className="h-8 w-8 text-red-500" />
      default:
        return <Package className="h-8 w-8" />
    }
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col space-y-2">    
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dettaglio Ordine #{order.id}</h1>
          <Link href="/orders">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna agli ordini
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informazioni Ordine</CardTitle>
            <CardDescription>Dettagli completi dell'ordine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ID Ordine</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Stato</p>
                <div>{getStatusBadge(order.state)}</div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Data Ordine</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{format(new Date(order.orderDate), "d MMMM yyyy, HH:mm", { locale: it })}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Prodotto</p>
                <p>{order.productName}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Prodotto Ordinato</h3>
              <div className="border rounded-md p-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{order.productName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      ID Prodotto: PROD-{order.id.split("-")[1]}
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">1 unità</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stato Ordine</CardTitle>
              <CardDescription>Gestisci lo stato dell'ordine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center py-4">
                {getStatusIcon(order.state)}
              </div>
              <div className="text-center">
                <h3 className="font-medium">Stato attuale</h3>
                <p className="text-muted-foreground">{getStatusLabel(order.state)}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium">Aggiorna stato</label>
                <Select value={orderStatus} onValueChange={(value: Order["state"]) => handleStatusChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lavorazione">In Lavorazione</SelectItem>
                    <SelectItem value="spedito">Spedito</SelectItem>
                    <SelectItem value="annullato">Annullato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={updateOrderStatus} 
                disabled={orderStatus === order.state || isUpdating}
              >
                {isUpdating ? "Aggiornamento..." : "Aggiorna Stato"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Azioni</CardTitle>
              <CardDescription>Azioni rapide per questo ordine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Segna come completato
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="mr-2 h-4 w-4" />
                Aggiorna tracciamento
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50">
                <XCircle className="mr-2 h-4 w-4" />
                Annulla ordine
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
