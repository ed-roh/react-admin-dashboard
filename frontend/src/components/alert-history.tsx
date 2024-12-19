import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

const alertHistory = [
    { date: '07/07/2023', type: 'Crítico', message: 'Falha no sistema de irrigação', status: 'Resolvido' },
    { date: '05/07/2023', type: 'Atenção', message: 'Umidade abaixo do ideal na Área 2', status: 'Resolvido' },
    { date: '03/07/2023', type: 'Informação', message: 'Manutenção preventiva realizada', status: 'Concluído' },
    { date: '01/07/2023', type: 'Atenção', message: 'Temperatura acima do normal', status: 'Monitorando' },
]

export function AlertHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Alertas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {alertHistory.map((alert, index) => (
                        <Alert key={index} variant={alert.type === 'Crítico' ? 'destructive' : alert.type === 'Atenção' ? 'default' : null}>
                            {alert.type === 'Crítico' ? (
                                <AlertCircle className="h-4 w-4" />
                            ) : alert.type === 'Atenção' ? (
                                <AlertTriangle className="h-4 w-4" />
                            ) : (
                                <CheckCircle className="h-4 w-4" />
                            )}
                            <AlertTitle>{alert.date} - {alert.type}</AlertTitle>
                            <AlertDescription>
                                {alert.message}
                                <span className="block mt-1 text-sm font-semibold">Status: {alert.status}</span>
                            </AlertDescription>
                        </Alert>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

