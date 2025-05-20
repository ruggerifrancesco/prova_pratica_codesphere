import { Suspense } from "react"
import type { Metadata } from "next"
import OrdersList from "./_components/orders-list"

export default function OrdersPage() {
    return (
        <div className="px-4 lg:px-6">
            <Suspense fallback={<div>Caricamento ordini...</div>}>
                <OrdersList />
            </Suspense>
        </div>
    )
}
