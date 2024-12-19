"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"

export function ProductionLogForm() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registro de Produção</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">
                            Data da Colheita
                        </label>
                        <Input
                            id="date"
                            type="date"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                            Quantidade Colhida (kg)
                        </label>
                        <Input
                            id="quantity"
                            type="number"
                            step="0.01"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium mb-1">
                            Observações
                        </label>
                        <Textarea
                            id="notes"
                            placeholder="Qualidade, problemas encontrados, etc."
                        />
                    </div>
                    <Button type="submit">Registrar</Button>
                </form>
            </CardContent>
        </Card>
    )
}

