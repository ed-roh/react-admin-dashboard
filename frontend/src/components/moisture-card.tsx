import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet } from 'lucide-react'

export function MoistureCard() {
    // In a real application, this value would come from your backend
    const moistureLevel = 75

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Umidade do Substrato</CardTitle>
                <Droplet className="h-4 w-4 text-muted-foreground" color={'blue'} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{moistureLevel}%</div>
                <p className="text-xs text-muted-foreground">Área de Cultivo Principal</p>
            </CardContent>
        </Card>
    )
}

