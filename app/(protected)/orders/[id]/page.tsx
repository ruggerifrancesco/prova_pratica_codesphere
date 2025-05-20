import { ordersData } from "@/lib/data/orders"
import OrderDetail from "./_components/order-details"

export default async function OrdersDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const order = ordersData.find((order) => order.id === id)

    if (!order) {
        return (
            <div className="px-4 lg:px-6">Ordine non trovato</div>
        )
    }

    return (
        <div className="px-4 lg:px-6">
            <OrderDetail order={order} />
        </div>
    )
}