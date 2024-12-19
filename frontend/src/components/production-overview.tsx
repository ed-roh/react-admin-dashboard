"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// In a real application, this data would come from your backend or local storage
const mockData = {
    currentBatch: {
        id: "L001",
        startDate: "2023-07-01",
        totalHarvest: { A: 50.5, B: 45.0, C: 30.0 },
        daysActive: 15,
    },
    dailyHarvests: [
        { date: "2023-07-10", A: 7.2, B: 5.8, C: 2.2 },
        { date: "2023-07-11", A: 6.8, B: 6.0, C: 2.0 },
        { date: "2023-07-12", A: 8.5, B: 5.5, C: 2.5 },
        { date: "2023-07-13", A: 7.9, B: 5.9, C: 2.1 },
        { date: "2023-07-14", A: 8.2, B: 6.2, C: 1.8 },
    ],
    recentRecords: [
        { date: "2023-07-14", quantities: { A: 8.2, B: 6.2, C: 1.8 }, problems: [] },
        { date: "2023-07-13", quantities: { A: 7.9, B: 5.9, C: 2.1 }, problems: ["sizeVariation"] },
        { date: "2023-07-12", quantities: { A: 8.5, B: 5.5, C: 2.5 }, problems: [] },
        { date: "2023-07-11", quantities: { A: 6.8, B: 6.0, C: 2.0 }, problems: [] },
        { date: "2023-07-10", quantities: { A: 7.2, B: 5.8, C: 2.2 }, problems: ["colorIssues"] },
    ],
}

export function ProductionOverview() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Visão da Produção</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Lote Atual: {mockData.currentBatch.id}</h3>
                            <p>Data de Início: {mockData.currentBatch.startDate}</p>
                            <p>Total Colhido:</p>
                            <ul className="list-disc list-inside">
                                <li>Qualidade A: {mockData.currentBatch.totalHarvest.A} kg</li>
                                <li>Qualidade B: {mockData.currentBatch.totalHarvest.B} kg</li>
                                <li>Qualidade C: {mockData.currentBatch.totalHarvest.C} kg</li>
                            </ul>
                            <p>Dias Ativos: {mockData.currentBatch.daysActive}</p>
                            <Badge className="mt-2" variant={mockData.currentBatch.daysActive <= 20 ? "default" : "destructive"}>
                                {mockData.currentBatch.daysActive <= 20 ? "Saudável" : "Atenção Necessária"}
                            </Badge>
                        </div>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockData.dailyHarvests}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="A" stroke="#8884d8" name="Qualidade A" />
                                    <Line type="monotone" dataKey="B" stroke="#82ca9d" name="Qualidade B" />
                                    <Line type="monotone" dataKey="C" stroke="#ffc658" name="Qualidade C" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Registros Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockData.recentRecords.map((record, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-semibold">{record.date}</p>
                                    <p>Quantidade A: {record.quantities.A} kg</p>
                                    <p>Quantidade B: {record.quantities.B} kg</p>
                                    <p>Quantidade C: {record.quantities.C} kg</p>
                                </div>
                                <div className="text-right">
                                    {record.problems.length > 0 && (
                                        <Badge variant="outline" className="ml-2">
                                            {record.problems.join(", ")}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

