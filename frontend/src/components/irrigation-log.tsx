import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const irrigationEvents = [
    { date: '07/07/2023', time: '08:30', duration: '15 min', area: 'Área 1 - Microaspersor 2', type: 'Automático' },
    { date: '05/07/2023', time: '14:45', duration: '20 min', area: 'Área 2 - Microaspersor 32', type: 'Manual' },
    { date: '03/07/2023', time: '10:15', duration: '15 min', area: 'Área 1 - Microaspersor 332', type: 'Automático' },
    { date: '01/07/2023', time: '16:00', duration: '25 min', area: 'Área 3 - Microaspersor 12', type: 'Manual' },
]

export function IrrigationLog() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Registro de Irrigação</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {irrigationEvents.map((event, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-semibold">{event.date} - {event.time}</p>
                                <p className="text-sm text-muted-foreground">Duração: {event.duration}</p>
                            </div>
                            <div className="text-right">
                                <p>{event.area}</p>
                                <Badge variant={event.type === 'Automático' ? 'secondary' : 'outline'}>
                                    {event.type}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

