import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface IrrigationScheduleSettingsProps {
    schedule: number[]
    onUpdate: (schedule: number[]) => void
}

export function IrrigationScheduleSettings({ schedule, onUpdate }: IrrigationScheduleSettingsProps) {
    const [activeHours, setActiveHours] = useState<number[]>(schedule)

    const toggleHour = (hour: number) => {
        setActiveHours((prev) => {
            if (prev.includes(hour)) {
                return prev.filter((h) => h !== hour)
            } else {
                return [...prev, hour].sort((a, b) => a - b)
            }
        })
    }

    const handleUpdate = () => {
        onUpdate(activeHours)
    }

    const formatHour = (hour: number) => {
        return `${hour.toString().padStart(2, '0')}:00`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Horários de Irrigação
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <InfoCircle className="h-5 w-5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Defina o período preferencial para irrigação clicando nas horas desejadas.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Label>Selecione as horas para irrigação:</Label>
                <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 24 }, (_, i) => (
                        <Button
                            key={i}
                            variant={activeHours.includes(i) ? "default" : "outline"}
                            className="p-2 h-auto"
                            onClick={() => toggleHour(i)}
                        >
                            {formatHour(i)}
                        </Button>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Período selecionado: {activeHours.length > 0
                        ? activeHours.map(hour => formatHour(hour)).join(', ')
                        : "Nenhum"}
                    </p>
                    <Button onClick={handleUpdate}>Atualizar</Button>
                </div>
            </CardContent>
        </Card>
    )
}

