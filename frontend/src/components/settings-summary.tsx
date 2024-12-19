import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SettingsSummaryProps {
    settings: {
        humidity: number
        irrigationDuration: number
        alertPhoneNumbers: string[]
        preferredSchedule: number[]
    }
}

export function SettingsSummary({ settings }: SettingsSummaryProps) {
    const formatHour = (hour: number) => {
        return `${hour.toString().padStart(2, '0')}:00`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumo das Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold">Nível de Umidade:</h3>
                    <p>{settings.humidity}%</p>
                </div>
                <div>
                    <h3 className="font-semibold">Tempo de Irrigação:</h3>
                    <p>{settings.irrigationDuration} minutos por ciclo</p>
                </div>
                <div>
                    <h3 className="font-semibold">Números para Alerta:</h3>
                    <ul className="list-disc list-inside">
                        {settings.alertPhoneNumbers.map((number) => (
                            <li key={number}>{number}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Horário(s) de Irrigação Escolhidos:</h3>
                    {settings.preferredSchedule.length > 0 ? (
                        <p>
                            {settings.preferredSchedule.map((hour) => formatHour(hour)).join(', ')}
                        </p>
                    ) : (
                        <p>Nenhum horário selecionado</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

