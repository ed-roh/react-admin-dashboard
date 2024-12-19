import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InfoIcon as InfoCircle, Plus, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AlertNotificationSettingsProps {
    phoneNumbers: string[]
    onUpdate: (phoneNumbers: string[]) => void
}

export function AlertNotificationSettings({ phoneNumbers, onUpdate }: AlertNotificationSettingsProps) {
    const [newNumber, setNewNumber] = useState("")

    const handleAddNumber = () => {
        if (newNumber && !phoneNumbers.includes(newNumber)) {
            onUpdate([...phoneNumbers, newNumber])
            setNewNumber("")
        }
    }

    const handleRemoveNumber = (number: string) => {
        onUpdate(phoneNumbers.filter((n) => n !== number))
    }

    const handleTestAlert = () => {
        alert("Uma mensagem de teste foi enviada para os números cadastrados.")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Notificações de Alerta
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <InfoCircle className="h-5 w-5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Adicione números de telefone para receber alertas do sistema.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="new-number">Adicionar Número de Telefone</Label>
                    <div className="flex space-x-2">
                        <Input
                            id="new-number"
                            placeholder="+55 (11) 99999-9999"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                        />
                        <Button onClick={handleAddNumber}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Números Cadastrados</Label>
                    {phoneNumbers.map((number) => (
                        <div key={number} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span>{number}</span>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveNumber(number)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button onClick={handleTestAlert} className="w-80">Enviar Alerta de Teste</Button>
            </CardContent>
        </Card>
    )
}

