import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer } from 'lucide-react'

export function TemperatureCard() {
    // In a real application, this value would come from your backend
    const temperature = 25

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperatura Ambiente</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground"
                             color={temperature <= 20 ? 'blue' : temperature <= 28 ? 'green' : 'red'}
                />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{temperature}°C</div>
                <p className="text-xs text-muted-foreground">Média nas últimas 24h</p>
            </CardContent>
        </Card>
    )
}

