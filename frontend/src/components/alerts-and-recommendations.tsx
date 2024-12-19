import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Lightbulb } from 'lucide-react'

export function AlertsAndRecommendations() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Alertas e Recomendações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Alerta de Consumo Anormal</AlertTitle>
                    <AlertDescription>
                        Detectamos um aumento súbito no consumo de água na Área 2. Verifique possíveis vazamentos.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Dica de Economia</AlertTitle>
                    <AlertDescription>
                        Considere ajustar o horário de irrigação para as primeiras horas da manhã para reduzir a evaporação e economizar água.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}

