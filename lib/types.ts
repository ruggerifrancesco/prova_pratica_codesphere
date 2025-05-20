type SortField = "id" | "productName" | "orderDate" | "state"
type SortDirection = "asc" | "desc"
type OrderState = "lavorazione" | "spedito" | "annullato"
type FilterState = "all" | OrderState

interface Order {
  id: string;
  productName: string;
  orderDate: Date | string;
  state: OrderState;
}

interface ChartDataPoint {
  date: string;
  lavorazione: number;
  spedito: number;
  annullato: number;
}


export type {
  SortField,
  SortDirection,
  OrderState,
  FilterState,
  Order,
  ChartDataPoint
}