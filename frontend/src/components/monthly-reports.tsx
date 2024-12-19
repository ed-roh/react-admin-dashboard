"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, Download } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This is a mock function. In a real application, you would implement actual PDF generation and download.
const downloadPDF = (month: string) => {
    console.log(`Downloading PDF for ${month}`)
    alert(`O PDF do relatório de ${month} seria baixado aqui.`)
}

const monthlyReports = [
    {
        month: 'Julho 2023',
        production: 500,
        avgHumidity: 75,
        irrigationCycles: 45,
        uptime: 99.5,
        alerts: 3,
        efficiency: 92,
        totalSaved: 1200,
        trends: {
            production: 'up',
            efficiency: 'up',
            alerts: 'down',
        }
    },
    {
        month: 'Junho 2023',
        production: 480,
        avgHumidity: 73,
        irrigationCycles: 50,
        uptime: 98.9,
        alerts: 5,
        efficiency: 89,
        totalSaved: 1000,
        trends: {
            production: 'down',
            efficiency: 'down',
            alerts: 'up',
        }
    },
    {
        month: 'Maio 2023',
        production: 470,
        avgHumidity: 72,
        irrigationCycles: 48,
        uptime: 99.1,
        alerts: 4,
        efficiency: 88,
        totalSaved: 950,
        trends: {
            production: 'up',
            efficiency: 'up',
            alerts: 'down',
        }
    },
]

export function MonthlyReports() {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

    const availableMonths = monthlyReports.map(report => report.month)

    const filteredReports = selectedMonth && selectedMonth !== "all"
        ? monthlyReports.filter(report => report.month === selectedMonth)
        : monthlyReports

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Relatórios Mensais</h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedMonth === "all" ? "Todos os meses" : selectedMonth || "Selecione um mês"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Select onValueChange={setSelectedMonth} value={selectedMonth || undefined}>
                            <SelectTrigger className="w-[240px]">
                                <SelectValue placeholder="Selecione um mês" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos os meses</SelectItem>
                                {availableMonths.map((month) => (
                                    <SelectItem key={month} value={month}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {filteredReports.map((report, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {report.month}
                                <Button variant="outline" onClick={() => downloadPDF(report.month)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Baixar PDF
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Produção</dt>
                                    <dd className="text-2xl font-bold">
                                        {report.production} kg
                                        {report.trends.production === 'up' ? (
                                            <ArrowUpIcon className="inline ml-1 text-green-500 h-4 w-4" />
                                        ) : (
                                            <ArrowDownIcon className="inline ml-1 text-red-500 h-4 w-4" />
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Umidade Média</dt>
                                    <dd className="text-2xl font-bold">{report.avgHumidity}%</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Ciclos de Irrigação</dt>
                                    <dd className="text-2xl font-bold">{report.irrigationCycles}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Tempo de Atividade</dt>
                                    <dd className="text-2xl font-bold">{report.uptime}%</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Alertas</dt>
                                    <dd className="text-2xl font-bold">
                                        {report.alerts}
                                        {report.trends.alerts === 'down' ? (
                                            <ArrowDownIcon className="inline ml-1 text-green-500 h-4 w-4" />
                                        ) : (
                                            <ArrowUpIcon className="inline ml-1 text-red-500 h-4 w-4" />
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Eficiência</dt>
                                    <dd className="text-2xl font-bold">
                                        {report.efficiency}%
                                        {report.trends.efficiency === 'up' ? (
                                            <ArrowUpIcon className="inline ml-1 text-green-500 h-4 w-4" />
                                        ) : (
                                            <ArrowDownIcon className="inline ml-1 text-red-500 h-4 w-4" />
                                        )}
                                    </dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="text-sm font-medium text-muted-foreground">Total Economizado</dt>
                                    <dd className="text-2xl font-bold text-green-600">R$ {report.totalSaved.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

