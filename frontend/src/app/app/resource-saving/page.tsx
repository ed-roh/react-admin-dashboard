import { ResourceEconomyHeader } from "@/components/resource-economy-header"
import { ResourceMetrics } from "@/components/resource-metrics"
import { WaterConsumptionGraph } from "@/components/water-consumption-graph"
import { AlertsAndRecommendations } from "@/components/alerts-and-recommendations"

export default function ResourceEconomyPage() {
    return (
        <div className="container mx-auto p-4 space-y-6 mb-20">
            <ResourceEconomyHeader />
            <ResourceMetrics />
            <WaterConsumptionGraph />
            <AlertsAndRecommendations />
        </div>
    )
}

