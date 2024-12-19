import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from 'lucide-react'

const maintenanceTasks = [
    { id: 1, task: "Limpeza do sensor de umidade - Área 2", estimatedTime: 15, difficulty: "Média", dueDate: "2023-07-15" },
    { id: 2, task: "Calibração do sistema de irrigação", estimatedTime: 30, difficulty: "Alta", dueDate: "2023-07-20" },
    { id: 3, task: "Inspeção visual dos equipamentos", estimatedTime: 20, difficulty: "Baixa", dueDate: "2023-07-25" },
]

export function PreventiveMaintenance() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manutenção Preventiva</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {maintenanceTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                            <div>
                                <p className="font-medium">{task.task}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">{task.estimatedTime} minutos</p>
                                    <Badge variant={task.difficulty === "Alta" ? "destructive" : task.difficulty === "Média" ? "default" : "secondary"}>
                                        {task.difficulty}
                                    </Badge>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">Vencimento</p>
                                <p className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

