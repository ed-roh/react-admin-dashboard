import { HistoricalHeader } from "@/components/historical-header"
import { HumidityGraph } from "@/components/humidity-graph"
import { IrrigationLog } from "@/components/irrigation-log"
import { AlertHistory } from "@/components/alert-history"
import { MonthlyReports } from "@/components/monthly-reports"

export default function HistoricalRecordsPage() {
    return (
        <div className="container mx-auto p-4 space-y-6 mb-20">
            <HistoricalHeader />
            <HumidityGraph />
            <IrrigationLog />
            <AlertHistory />
            <MonthlyReports />
        </div>
    )
}

