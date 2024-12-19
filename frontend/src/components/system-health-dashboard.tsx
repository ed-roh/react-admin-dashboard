import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryWarning } from 'lucide-react'

const sensors = [
    { id: 1, name: "Sensor de Umidade - Área 1", batteryLevel: 85 },
    { id: 2, name: "Sensor de Temperatura - Área 1", batteryLevel: 72 },
    { id: 3, name: "Sensor de Umidade - Área 2", batteryLevel: 15 },
    { id: 4, name: "Sensor de Temperatura - Área 2", batteryLevel: 5 },
]

function BatteryIcon({ level }: { level: number }) {
    if (level > 90) return <BatteryFull className="h-6 w-6 text-green-500" />
    if (level > 50) return <BatteryCharging className="h-6 w-6 text-green-500" />
    if (level > 20) return <Battery className="h-6 w-6 text-yellow-500" />
    if (level > 10) return <BatteryLow className="h-6 w-6 text-orange-500" />
    return <BatteryWarning className="h-6 w-6 text-red-500" />
}

export function SystemHealthDashboard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sensors.map((sensor) => (
                        <div key={sensor.id} className="flex items-center justify-between p-2 border rounded">
                            <div>
                                <p className="font-medium">{sensor.name}</p>
                                <p className={`text-sm ${sensor.batteryLevel < 20 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                    Bateria: {sensor.batteryLevel}%
                                </p>
                            </div>
                            <BatteryIcon level={sensor.batteryLevel} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

