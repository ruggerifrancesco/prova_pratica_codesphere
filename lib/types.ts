export interface Order {
  id: string;
  productName: string;
  orderDate: Date | string;
  state: "lavorazione" | "spedito" | "annullato";
}

export interface ChartDataPoint {
  date: string;
  lavorazione: number;
  spedito: number;
  annullato: number;
}
