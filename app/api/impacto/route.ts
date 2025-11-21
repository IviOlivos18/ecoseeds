import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1) API REAL: CO₂ desde Open-Meteo (CDMX)
        const airRes = await fetch(
            "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=19.43&longitude=-99.13&hourly=carbon_monoxide"
        );

        const air = await airRes.json();
        const co2 = air.hourly?.carbon_monoxide?.[0] ?? 0;

        // 2) Árboles simulados (valores estables)
        const arboles = 500;         // total plantados
        const arboles_dia = 5;       // por día
        const arboles_mes = 10500;     // por mes

        return NextResponse.json({
            arboles,
            arboles_dia,
            arboles_mes,
            co2
        });

    } catch (error) {
        console.error("Error consultando API externa:", error);
        return NextResponse.json(
            { error: "Error cargando impacto externo" },
            { status: 500 }
        );
    }
}
