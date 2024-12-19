import { MoistureCard } from "@/components/moisture-card"
import { IrrigationStatusCard } from "@/components/irrigation-status-card"
import { TemperatureCard } from "@/components/temperature-card"
import { StatusIndicator } from "@/components/status-indicator"
import { AlertsList } from "@/components/alerts-list"
import { MoistureGraph } from "@/components/moisture-graph"
import EnvironmentalMetrics from "@/components/environmental-metrics";

export default function DashboardPage() {
    return (
        <div className={'mb-20'}>
            <div className="container mx-auto p-4 md:p-8 space-y-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MoistureCard />
                    <IrrigationStatusCard />
                    <TemperatureCard />
                </div>
                <StatusIndicator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AlertsList />
                    <EnvironmentalMetrics />
                </div>
                <MoistureGraph />
            </div>
        </div>
    )
}

