"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Droplets } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for zones and microsprinklers
const irrigationZones = [
    { id: "zone1", name: "Zona 1", microsprinklers: Array.from({ length: 100 }, (_, i) => `M${i + 1}`) },
    { id: "zone2", name: "Zona 2", microsprinklers: Array.from({ length: 100 }, (_, i) => `M${i + 101}`) },
    { id: "zone3", name: "Zona 3", microsprinklers: Array.from({ length: 100 }, (_, i) => `M${i + 201}`) },
]

export function IrrigationTestPanel() {
    const [selectedZone, setSelectedZone] = useState("")
    const [selectedMicrosprinkler, setSelectedMicrosprinkler] = useState<string | null>(null)
    const [testDuration, setTestDuration] = useState("5")
    const [testStatus, setTestStatus] = useState<"idle" | "running" | "completed">("idle")
    const [testResult, setTestResult] = useState<"success" | "failure" | null>(null)

    const handleZoneChange = (zoneId: string) => {
        setSelectedZone(zoneId)
        setSelectedMicrosprinkler(null)
    }

    const handleStartTest = () => {
        setTestStatus("running")
        // Simulate a test run
        setTimeout(() => {
            setTestStatus("completed")
            setTestResult(Math.random() > 0.2 ? "success" : "failure")
        }, parseInt(testDuration) * 1000)
    }

    const selectedZoneData = irrigationZones.find(zone => zone.id === selectedZone)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-6 w-6 text-blue-500" />
                    <span>Teste do Sistema de Irrigação</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="zone">Zona de Irrigação</Label>
                        <Select value={selectedZone} onValueChange={handleZoneChange}>
                            <SelectTrigger id="zone">
                                <SelectValue placeholder="Selecione a zona" />
                            </SelectTrigger>
                            <SelectContent>
                                {irrigationZones.map((zone) => (
                                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedZoneData && (
                        <div className="space-y-2">
                            <Label htmlFor="microsprinkler">Microaspersor</Label>
                            <Select
                                value={selectedMicrosprinkler || ""}
                                onValueChange={setSelectedMicrosprinkler}
                            >
                                <SelectTrigger id="microsprinkler">
                                    <SelectValue placeholder="Selecione o microaspersor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-[200px]">
                                        <SelectItem value="all">Todos os Microaspersores</SelectItem>
                                        {selectedZoneData.microsprinklers.map((microsprinkler) => (
                                            <SelectItem key={microsprinkler} value={microsprinkler}>
                                                {microsprinkler}
                                            </SelectItem>
                                        ))}
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="duration">Duração do Teste (segundos)</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={testDuration}
                            onChange={(e) => setTestDuration(e.target.value)}
                            min="1"
                            max="60"
                        />
                    </div>

                    <Button
                        onClick={handleStartTest}
                        disabled={testStatus === "running" || !selectedZone || !selectedMicrosprinkler}
                    >
                        {testStatus === "running" ? "Teste em Andamento..." : "Iniciar Teste"}
                    </Button>

                    {testStatus === "completed" && (
                        <div className={`flex items-center space-x-2 ${testResult === "success" ? "text-green-500" : "text-red-500"}`}>
                            {testResult === "success" ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                            <span>
                {testResult === "success"
                    ? `Teste concluído com sucesso para ${selectedMicrosprinkler === "all" ? "todos os microaspersores" : selectedMicrosprinkler}`
                    : "Falha no teste. Entre em contato com o suporte."}
              </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

