import { ProductionRecordForm } from "@/components/production-record-form"
import { ProductionOverview } from "@/components/production-overview"

export default function ProductionRecordPage() {
    return (
        <div className="container mx-auto p-4 space-y-8 mb-20">
            <h1 className="text-3xl font-bold">Registro de Produção</h1>
            <ProductionRecordForm />
            <ProductionOverview />
        </div>
    )
}

