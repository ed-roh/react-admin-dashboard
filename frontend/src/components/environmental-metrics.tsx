import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Wind, Droplets, FlaskRound } from 'lucide-react';

// In a real application, this would come from your API based on AREA_CULTIVO table
const mockEnvironmentalData = {
    co2_ar: 850, // ppm
    ph_agua: 6.8,
    nutrientes_agua: 85 // percentage
};

export function EnvironmentalMetrics() {
    const getPhColor = (ph: number) => {
        if (ph < 6.0 || ph > 7.5) return "text-red-500";
        if (ph < 6.3 || ph > 7.2) return "text-yellow-500";
        return "text-green-500";
    };

    const getCO2Color = (co2: number) => {
        if (co2 < 600 || co2 > 1200) return "text-red-500";
        if (co2 < 700 || co2 > 1000) return "text-yellow-500";
        return "text-green-500";
    };

    const getNutrientsColor = (level: number) => {
        if (level < 60) return "text-red-500";
        if (level < 75) return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* CO2 Level */}
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <Wind
                            className={`h-8 w-8 mb-2 ${getCO2Color(mockEnvironmentalData.co2_ar)}`}
                        />
                        <span className="text-sm text-muted-foreground mb-1">CO₂</span>
                        <div className="text-2xl font-bold">
                            {mockEnvironmentalData.co2_ar}
                            <span className="text-sm font-normal text-muted-foreground ml-1">ppm</span>
                        </div>
                    </div>

                    {/* pH Level */}
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <Droplets
                            className={`h-8 w-8 mb-2 ${getPhColor(mockEnvironmentalData.ph_agua)}`}
                        />
                        <span className="text-sm text-muted-foreground mb-1">pH da Água</span>
                        <div className="text-2xl font-bold">
                            {mockEnvironmentalData.ph_agua.toFixed(1)}
                        </div>
                    </div>

                    {/* Nutrient Level */}
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <FlaskRound
                            className={`h-8 w-8 mb-2 ${getNutrientsColor(mockEnvironmentalData.nutrientes_agua)}`}
                        />
                        <span className="text-sm text-muted-foreground mb-1">Nutrientes</span>
                        <div className="text-2xl font-bold">
                            {mockEnvironmentalData.nutrientes_agua}
                            <span className="text-sm font-normal text-muted-foreground ml-1">%</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm text-center">
                        {mockEnvironmentalData.co2_ar > 1000 || mockEnvironmentalData.co2_ar < 700 ? (
                            <p className="text-yellow-600">Nível de CO₂ fora do ideal. Verifique a ventilação.</p>
                        ) : mockEnvironmentalData.ph_agua < 6.3 || mockEnvironmentalData.ph_agua > 7.2 ? (
                            <p className="text-yellow-600">pH da água precisa de ajuste.</p>
                        ) : mockEnvironmentalData.nutrientes_agua < 75 ? (
                            <p className="text-yellow-600">Nível de nutrientes baixo. Considere reposição.</p>
                        ) : (
                            <p className="text-green-600">Todas as condições estão adequadas ✓</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default EnvironmentalMetrics;