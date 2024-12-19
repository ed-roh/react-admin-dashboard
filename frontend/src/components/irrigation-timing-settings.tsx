import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface IrrigationTimingSettingsProps {
    duration: number
    onUpdate: (duration: number) => void
}

export function IrrigationTimingSettings({ duration, onUpdate }: IrrigationTimingSettingsProps) {
    const handleUpdate = (value: number[]) => {
        onUpdate(value[0])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Tempo de Irrigação
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <InfoCircle className="h-5 w-5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Defina por quanto tempo o sistema de irrigação ficará ativo quando acionado.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="irrigation-duration">Duração da Irrigação</Label>
                    <div className="flex items-center space-x-4">
                        <Slider
                            id="irrigation-duration"
                            min={1}
                            max={15}
                            step={1}
                            value={[duration]}
                            onValueChange={handleUpdate}
                        />
                        <span className="w-16 text-right">{duration} min</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">
                    Aproximadamente {(duration * 0.4).toFixed(1)}mm de água por ciclo de irrigação.
                </p>
            </CardContent>
        </Card>
    )
}

