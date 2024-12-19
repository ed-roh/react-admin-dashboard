import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HumiditySettingsProps {
    humidity: number
    onUpdate: (humidity: number) => void
}

export function HumiditySettings({ humidity, onUpdate }: HumiditySettingsProps) {
    const handleUpdate = (value: number[]) => {
        onUpdate(value[0])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Nível de Umidade
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <InfoCircle className="h-5 w-5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajuste o nível de umidade desejado para o cultivo.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="humidity">Umidade Desejada</Label>
                    <div className="flex items-center space-x-4">
                        <Slider
                            id="humidity"
                            min={60}
                            max={100}
                            step={1}
                            value={[humidity]}
                            onValueChange={handleUpdate}
                        />
                        <span className="w-12 text-right">{humidity}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

