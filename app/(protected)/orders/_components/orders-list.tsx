"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns"
import { it } from "date-fns/locale"
import {
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ordersData } from "@/lib/data/orders"
import type { FilterState, Order, SortDirection, SortField } from "@/lib/types"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"


export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [page, setPage] = useState(1)
  const [filterState, setFilterState] = useState<FilterState>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("orderDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const pageSize = 10

  useEffect(() => {
    // Parse dates from strings to Date objects
    const parsedOrders: Order[] = ordersData.map((order) => ({
      ...order,
      orderDate: new Date(order.orderDate),
    }))

    setOrders(parsedOrders)
    applyFilters(parsedOrders, filterState, searchQuery, sortField, sortDirection, dateRange)
  }, [])

  const applyFilters = (
    data: Order[],
    state: FilterState,
    query: string,
    field: SortField,
    direction: SortDirection,
    dateFilter: DateRange | undefined,
  ) => {
    let result = [...data]

    // Apply state filter
    if (state !== "all") {
      result = result.filter((order) => order.state === state)
    }

    // Apply date range filter
    if (dateFilter && (dateFilter.from || dateFilter.to)) {
      result = result.filter((order) => {
        const orderDate = new Date(order.orderDate)

        if (dateFilter.from && dateFilter.to) {
          return isWithinInterval(orderDate, {
            start: startOfDay(dateFilter.from),
            end: endOfDay(dateFilter.to),
          })
        } else if (dateFilter.from) {
          return orderDate >= startOfDay(dateFilter.from)
        } else if (dateFilter.to) {
          return orderDate <= endOfDay(dateFilter.to)
        }

        return true
      })
    }

    // Apply search query
    if (query.trim() !== "") {
      const lowercaseQuery = query.toLowerCase()
      result = result.filter(
        (order) =>
          order.productName.toLowerCase().includes(lowercaseQuery) || order.id.toString().includes(lowercaseQuery),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      if (field === "orderDate") {
        comparison = new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      } else if (field === "id") {
        comparison = a.id.localeCompare(b.id)
      } else if (field === "productName") {
        comparison = a.productName.localeCompare(b.productName)
      } else if (field === "state") {
        comparison = a.state.localeCompare(b.state)
      }

      return direction === "asc" ? comparison : -comparison
    })

    setFilteredOrders(result)
    setPage(1) // Reset to first page when filters change
  }

  const handleFilterChange = (value: FilterState) => {
    setFilterState(value)
    applyFilters(orders, value, searchQuery, sortField, sortDirection, dateRange)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    applyFilters(orders, filterState, query, sortField, sortDirection, dateRange)
  }

  const handleSort = (field: SortField) => {
    const direction = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(direction)
    applyFilters(orders, filterState, searchQuery, field, direction, dateRange)
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    applyFilters(orders, filterState, searchQuery, sortField, sortDirection, range)
  }

  const clearDateFilter = () => {
    setDateRange({ from: undefined, to: undefined })
    applyFilters(orders, filterState, searchQuery, sortField, sortDirection, { from: undefined, to: undefined })
  }

  const totalPages = Math.ceil(filteredOrders.length / pageSize)
  const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize)

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
    <Card>
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input placeholder="Cerca ordini..." value={searchQuery} onChange={handleSearch} className="max-w-sm" />
            <Select value={filterState} onValueChange={(value: FilterState) => handleFilterChange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtra per stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="lavorazione">In Lavorazione</SelectItem>
                <SelectItem value="spedito">Spediti</SelectItem>
                <SelectItem value="annullato">Annullati</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Calendar className="h-4 w-4 mr-2" />
                  {dateRange?.from || dateRange?.to ? (
                    <span>
                      {dateRange?.from ? format(dateRange?.from, "d MMM", { locale: it }) : "..."} -{" "}
                      {dateRange?.to ? format(dateRange?.to, "d MMM", { locale: it }) : "..."}
                    </span>
                  ) : (
                    <span>Filtra per data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Seleziona intervallo date</h4>
                    {(dateRange?.from || dateRange?.to) && (
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearDateFilter}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-1 text-sm text-muted-foreground">
                    {dateRange?.from && <span>{format(dateRange?.from, "d MMMM yyyy", { locale: it })}</span>}
                    {dateRange?.from && dateRange?.to && <span> - </span>}
                    {dateRange?.to && <span>{format(dateRange?.to, "d MMMM yyyy", { locale: it })}</span>}
                  </div>
                </div>
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                  locale={it}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Esporta
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Ordine
            </Button>
          </div>
        </div>

        {/* Active filters display */}
        {(filterState !== "all" || dateRange?.from || dateRange?.to || searchQuery) && (
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="text-muted-foreground">Filtri attivi:</span>
            {filterState !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Stato:{" "}
                {filterState === "lavorazione" ? "In Lavorazione" : filterState === "spedito" ? "Spedito" : "Annullato"}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleFilterChange("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {(dateRange?.from || dateRange?.to) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Data: {dateRange?.from ? format(dateRange?.from, "d MMM", { locale: it }) : "..."} -{" "}
                {dateRange?.to ? format(dateRange?.to, "d MMM", { locale: it }) : "..."}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={clearDateFilter}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Ricerca: {searchQuery}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setSearchQuery("")
                    applyFilters(orders, filterState, "", sortField, sortDirection, dateRange)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("id")}>
                    <span>ID</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("productName")}>
                    <span>Prodotto</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("orderDate")}>
                    <span>Data Ordine</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("state")}>
                    <span>Stato</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{format(new Date(order.orderDate), "d MMMM yyyy", { locale: it })}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nessun risultato trovato.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {filteredOrders.length > 0 ? (
              <>
                Mostrando <span className="font-medium">{(page - 1) * pageSize + 1}</span> a{" "}
                <span className="font-medium">{Math.min(page * pageSize, filteredOrders.length)}</span> di{" "}
                <span className="font-medium">{filteredOrders.length}</span> risultati
              </>
            ) : (
              "Nessun risultato trovato"
            )}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(1)}
              disabled={page === 1 || filteredOrders.length === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || filteredOrders.length === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || filteredOrders.length === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages || filteredOrders.length === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
