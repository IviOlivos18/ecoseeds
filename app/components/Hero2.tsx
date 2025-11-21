"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero2() {
  const [impacto, setImpacto] = useState<{
    arboles?: number;
    arboles_dia?: number;
    co2?: number;
  }>({}); // Estado inicial vacío

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("/api/impacto");
        const data = await res.json();
        setImpacto(data);
      } catch (e) {
        console.error("Error cargando impacto:", e);
      }
    }
    cargar();
  }, []);

  const data = [
    {
      icon: "/images/arbol.svg",
      value:
        typeof impacto.arboles === "number"
          ? impacto.arboles.toLocaleString()
          : "Cargando...",
      label: "Árboles plantados",
    },
    {
      icon: "/images/donador.svg",
      value:
        typeof impacto.arboles_dia === "number"
          ? impacto.arboles_dia.toLocaleString()
          : "Cargando...",
      label: "Árboles plantados hoy",
    },
    {
      icon: "/images/co2.svg",
      value:
        typeof impacto.co2 === "number"
          ? impacto.co2.toLocaleString()
          : "Cargando...",
      label: "CO₂ ambiental",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center bg-white py-55 px-8 lg:px-20">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-black mb-12 text-center">
        El poder de tu ayuda
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 text-center"
          >
            <div className="w-20 h-20 flex items-center justify-center mb-4">
              <Image
                src={item.icon}
                alt={item.label}
                width={72}
                height={72}
                className="object-contain"
              />
            </div>

            <h3 className="text-3xl font-bold text-green-700 mb-2">
              {item.value}
            </h3>

            <p className="text-gray-700 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
