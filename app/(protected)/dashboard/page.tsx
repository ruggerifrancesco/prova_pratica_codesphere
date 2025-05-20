"use client"

import { useState, useEffect } from "react"
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from "date-fns"
import { it } from "date-fns/locale"
import { BarChart, CalendarDays } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrdersChart from "./_components/orders-chart"
import { ordersData } from "@/lib/data/orders"
import { SectionCards } from "@/app/(protected)/dashboard/_components/section-cards"
import { Order } from "@/lib/types"
import OrdersTable from "./_components/orders-table"

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Parse dates from strings to Date objects
    const parsedOrders = ordersData.map(order => ({
      ...order,
      orderDate: new Date(order.orderDate)
    }))

    setOrders(parsedOrders)

    // Filter for the latest month
    const now = new Date()
    const lastMonth = subMonths(now, 1)
    const lastMonthStart = startOfMonth(lastMonth)
    const lastMonthEnd = endOfMonth(lastMonth)

    const lastMonthOrders = parsedOrders.filter(order =>
      isWithinInterval(order.orderDate, { start: lastMonthStart, end: lastMonthEnd })
    )

    setFilteredOrders(lastMonthOrders)
  }, [])

  // Count orders by state
  const processingOrders = filteredOrders.filter(order => order.state === "lavorazione").length
  const shippedOrders = filteredOrders.filter(order => order.state === "spedito").length
  const canceledOrders = filteredOrders.filter(order => order.state === "annullato").length

  return (
    <div className="px-4 lg:px-6">
      <SectionCards
      processingOrders={processingOrders}
      shippedOrders={shippedOrders}
      canceledOrders={canceledOrders}
       />
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            Panoramica
          </TabsTrigger>
          <TabsTrigger value="orders">
            <CalendarDays className="h-4 w-4 mr-2" />
            Ordini
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Ordini</CardTitle>
              <CardDescription>
                Distribuzione degli ordini per stato nell'ultimo mese
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OrdersChart orders={filteredOrders} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ordini Recenti</CardTitle>
              <CardDescription>
                Lista degli ordini dell'ultimo mese
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable orders={filteredOrders} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
