"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
    { date: '01/07', actual: 2400, expected: 2400 },
    { date: '02/07', actual: 2200, expected: 2300 },
    { date: '03/07', actual: 2800, expected: 2400 },
    { date: '04/07', actual: 2600, expected: 2500 },
    { date: '05/07', actual: 2700, expected: 2400 },
    { date: '06/07', actual: 2300, expected: 2300 },
    { date: '07/07', actual: 2100, expected: 2200 },
]

export function WaterConsumptionGraph() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Consumo de Água</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="actual" stroke="#3b82f6" name="Consumo Real" />
                            <Line type="monotone" dataKey="expected" stroke="#9ca3af" strokeDasharray="5 5" name="Consumo Esperado" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

