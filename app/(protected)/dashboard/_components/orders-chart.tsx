"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format, parseISO } from "date-fns"
import { it } from "date-fns/locale"
import type { Order, ChartDataPoint } from "@/lib/types"

interface OrdersChartProps {
  orders: Order[]
}

export default function OrdersChart({ orders }: OrdersChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    // Group orders by day and count by state
    const groupedByDay = orders.reduce<Record<string, ChartDataPoint>>((acc, order) => {
      const date = format(new Date(order.orderDate), "yyyy-MM-dd")

      if (!acc[date]) {
        acc[date] = {
          date,
          lavorazione: 0,
          spedito: 0,
          annullato: 0,
        }
      }

      acc[date][order.state]++

      return acc
    }, {})

    // Convert to array and sort by date
    const chartData = Object.values(groupedByDay).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    setChartData(chartData)
  }, [orders])

  const formatDate = (dateStr: string) => {
    return format(parseISO(dateStr), "d MMM", { locale: it })
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} />
        <Tooltip
          formatter={(value: number, name: string) => {
            const labels: Record<string, string> = {
              lavorazione: "In Lavorazione",
              spedito: "Spedito",
              annullato: "Annullato",
            }
            return [value, labels[name] || name]
          }}
          labelFormatter={(label: string) => format(parseISO(label), "d MMMM yyyy", { locale: it })}
        />
        <Legend
          formatter={(value: string) => {
            const labels: Record<string, string> = {
              lavorazione: "In Lavorazione",
              spedito: "Spedito",
              annullato: "Annullato",
            }
            return labels[value] || value
          }}
        />
        <Bar dataKey="lavorazione" fill="#facc15" />
        <Bar dataKey="spedito" fill="#22c55e" />
        <Bar dataKey="annullato" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
