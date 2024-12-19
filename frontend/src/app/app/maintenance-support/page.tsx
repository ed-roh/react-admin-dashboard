import { SystemHealthDashboard } from "@/components/system-health-dashboard"
import { PreventiveMaintenance } from "@/components/preventive-maintenance"
import { IrrigationTestPanel } from "@/components/irrigation-test-panel"
import { SupportContact } from "@/components/support-contact"
import { TroubleshootingGuide } from "@/components/troubleshooting-guide"
import { NotificationHistory } from "@/components/notification-history"

export default function MaintenanceAndSupportPage() {
    return (
        <div className="container mx-auto p-4 space-y-6 mb-20">
            <h1 className="text-3xl font-bold mb-6">Manutenção e Suporte</h1>
            <SystemHealthDashboard />
            <PreventiveMaintenance />
            <IrrigationTestPanel />
            <SupportContact />
            <TroubleshootingGuide />
            <NotificationHistory />
        </div>
    )
}

