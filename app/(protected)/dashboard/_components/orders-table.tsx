"use client"

import { useState } from "react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/lib/types"

interface OrdersTableProps {
  orders: Order[]
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(orders.length / pageSize)

  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize)

  const getStatusBadge = (status: Order["state"]) => {
    switch (status) {
      case "lavorazione":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Lavorazione
          </Badge>
        )
      case "spedito":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Spedito
          </Badge>
        )
      case "annullato":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Annullato
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Prodotto</TableHead>
              <TableHead className="hidden md:table-cell">Data Ordine</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(order.orderDate), "d MMMM yyyy", { locale: it })}
                </TableCell>
                <TableCell>{getStatusBadge(order.state)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Apri menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                      <DropdownMenuItem>Visualizza dettagli</DropdownMenuItem>
                      <DropdownMenuItem>Aggiorna stato</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Annulla ordine</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Mostrando <span className="font-medium">{(page - 1) * pageSize + 1}</span> a{" "}
          <span className="font-medium">{Math.min(page * pageSize, orders.length)}</span> di{" "}
          <span className="font-medium">{orders.length}</span> risultati
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage(1)} disabled={page === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}