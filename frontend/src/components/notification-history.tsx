import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const notificationHistory = [
    { id: 1, type: "Manutenção", message: "Limpeza do sensor de umidade - Área 2 concluída", date: "2023-07-10" },
    { id: 2, type: "Teste", message: "Teste do sistema de irrigação realizado com sucesso", date: "2023-07-08" },
    { id: 3, type: "Suporte", message: "Chamado de suporte #1234 resolvido", date: "2023-07-05" },
    { id: 4, type: "Alerta", message: "Bateria baixa no sensor de temperatura - Área 1", date: "2023-07-03" },
]

export function NotificationHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Notificações</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notificationHistory.map((notification) => (
                        <div key={notification.id} className="flex items-center justify-between p-2 border rounded">
                            <div>
                                <Badge
                                    variant={
                                        notification.type === "Alerta" ? "destructive" :
                                            notification.type === "Manutenção" ? "default" :
                                                notification.type === "Teste" ? "secondary" : "outline"
                                    }
                                >
                                    {notification.type}
                                </Badge>
                                <p className="mt-1">{notification.message}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.date}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

