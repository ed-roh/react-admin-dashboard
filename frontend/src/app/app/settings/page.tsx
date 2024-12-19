"use client"

import { useState } from "react"
import { HumiditySettings } from "@/components/humidity-settings"
import { IrrigationTimingSettings } from "@/components/irrigation-timing-settings"
import { AlertNotificationSettings } from "@/components/alert-notification-settings"
import { IrrigationScheduleSettings } from "@/components/irrigation-schedule-settings"
import { SettingsSummary } from "@/components/settings-summary"

export default function BasicSettingsPage() {
    const [settings, setSettings] = useState({
        humidity: 80,
        irrigationDuration: 5,
        alertPhoneNumbers: ["+5511999999999"],
        preferredSchedule: [] as number[],
    })

    const updateSettings = (newSettings: Partial<typeof settings>) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
        }))
    }

    return (
        <div className="container mx-auto p-4 space-y-6 mb-20">
            <h1 className="text-3xl font-bold mb-6">Configurações Básicas</h1>
            <p className="text-lg text-muted-foreground mb-6">
                Ajuste os parâmetros do seu sistema de irrigação. Todas as alterações são salvas e aplicadas automaticamente.
            </p>
            <HumiditySettings
                humidity={settings.humidity}
                onUpdate={(humidity) => updateSettings({ humidity })}
            />
            <IrrigationTimingSettings
                duration={settings.irrigationDuration}
                onUpdate={(irrigationDuration) => updateSettings({ irrigationDuration })}
            />
            <AlertNotificationSettings
                phoneNumbers={settings.alertPhoneNumbers}
                onUpdate={(alertPhoneNumbers) => updateSettings({ alertPhoneNumbers })}
            />
            <IrrigationScheduleSettings
                schedule={settings.preferredSchedule}
                onUpdate={(preferredSchedule) => updateSettings({ preferredSchedule })}
            />
            <SettingsSummary settings={settings} />
        </div>
    )
}

