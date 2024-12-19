"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function MoistureGraph() {
    // In a real application, this data would come from your backend
    const data = [
        { time: '00:00', moisture: 70 },
        { time: '04:00', moisture: 72 },
        { time: '08:00', moisture: 68 },
        { time: '12:00', moisture: 75 },
        { time: '16:00', moisture: 73 },
        { time: '20:00', moisture: 71 },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Umidade</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="moisture" stroke="blue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

