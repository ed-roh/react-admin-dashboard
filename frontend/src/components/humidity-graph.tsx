"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
    { date: '01/07', humidity: 75, irrigation: 3 },
    { date: '02/07', humidity: 72, irrigation: 8 },
    { date: '03/07', humidity: 78, irrigation: 7 },
    { date: '04/07', humidity: 76, irrigation: 5 },
    { date: '05/07', humidity: 74, irrigation: 4 },
    { date: '06/07', humidity: 77, irrigation: 6 },
    { date: '07/07', humidity: 75, irrigation: 3 },
]

export function HumidityGraph() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Umidade e Irrigação</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#3b82f6" name="Umidade (%)" />
                            <Line yAxisId="right" type="step" dataKey="irrigation" stroke="#10b981" name="Irrigação (On/Off)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

