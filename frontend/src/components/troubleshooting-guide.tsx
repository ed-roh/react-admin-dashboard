"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const troubleshootingItems = [
    {
        id: "item-1",
        title: "Sensor de umidade não está respondendo",
        content: "1. Verifique se o sensor está corretamente conectado.\n2. Limpe o sensor de qualquer sujeira ou detritos.\n3. Verifique o nível da bateria e substitua se necessário.\n4. Se o problema persistir, entre em contato com o suporte técnico."
    },
    {
        id: "item-2",
        title: "Sistema de irrigação não liga",
        content: "1. Verifique se há energia elétrica chegando ao sistema.\n2. Inspecione os fusíveis e disjuntores.\n3. Verifique se a bomba d'água está funcionando corretamente.\n4. Se o problema persistir, entre em contato com o suporte técnico."
    },
    {
        id: "item-3",
        title: "Aplicativo não está recebendo dados dos sensores",
        content: "1. Verifique a conexão de internet do seu dispositivo.\n2. Certifique-se de que os sensores estão ligados e com bateria suficiente.\n3. Reinicie o aplicativo e o sistema de monitoramento.\n4. Se o problema persistir, entre em contato com o suporte técnico."
    }
]

export function TroubleshootingGuide() {
    const [openItem, setOpenItem] = useState<string | undefined>(undefined)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Guia de Solução de Problemas</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                    {troubleshootingItems.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent>
                                <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}

