'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'

export function SupportContact() {
    const openWhatsApp = () => {
        const phoneNumber = "+5511999999999" // Replace with your actual support number
        const message = encodeURIComponent("Olá, preciso de suporte técnico para o meu sistema de irrigação.")
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contato com Suporte Técnico</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Precisa de ajuda? Nossa equipe de suporte está pronta para auxiliar você.</p>
                <Button onClick={openWhatsApp} className="w-full bg-green-700 max-w-80">
                    <MessageCircle className="mr-2 h-4 w-4" /> Contatar Suporte via WhatsApp
                </Button>
            </CardContent>
        </Card>
    )
}

