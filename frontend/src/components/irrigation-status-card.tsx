import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout } from 'lucide-react'

export function IrrigationStatusCard() {
    // In a real application, this value would come from your backend
    const isIrrigationOn = true

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status da Irrigação</CardTitle>
                <Sprout className="h-4 w-4 text-muted-foreground" color={'green'} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{isIrrigationOn ? "Ligado" : "Desligado"}</div>
                <p className="text-xs text-muted-foreground">Sistema Automático</p>
            </CardContent>
        </Card>
    )
}

