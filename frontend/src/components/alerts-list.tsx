import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

export function AlertsList() {
    // In a real application, these alerts would come from your backend
    const alerts = [
        { id: 1, message: "Umidade baixa na Área 2 - Microaspersor 290", timestamp: "2023-07-10 14:30" },
        { id: 2, message: "Manutenção preventiva necessária", timestamp: "2023-07-09 09:15" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Alertas Essenciais</CardTitle>
            </CardHeader>
            <CardContent>
                {alerts.length > 0 ? (
                    <ul className="space-y-2">
                        {alerts.map((alert) => (
                            <li key={alert.id} className="flex items-start space-x-2">
                                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-medium">{alert.message}</p>
                                    <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum alerta no momento.</p>
                )}
            </CardContent>
        </Card>
    )
}

