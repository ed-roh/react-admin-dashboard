"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ResourceEconomyHeader() {
    const [timeFrame, setTimeFrame] = useState("weekly")

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Economia de Recursos</h1>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

