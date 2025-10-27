"use client";

import Image from "next/image";
import React from "react";

export default function Hero() {
    const items = [
        {
            title: "Regenerar",
            text: "Devolvemos vida a la tierra, restaurando ecosistemas y sembrando futuro.",
            icon: "/icons/regenerar.svg",
        },
        {
            title: "Unir",
            text: "Promovemos la conciencia ambiental e inspiramos a otros a sumarse al cambio.",
            icon: "/icons/unir.svg",
        },
        {
            title: "Cuidar",
            text: "Protegemos cada árbol plantado, asegurando su crecimiento y un impacto duradero.",
            icon: "/icons/cuidar.svg",
        },
    ];
    

    return (
        <section className="w-full flex flex-col items-center justify-center bg-white">
            {/* HERO PRINCIPAL */}
            <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-8 w-full max-w-7xl">
                {/* Texto principal */}
                <div className="flex-1 space-y-3 text-center lg:text-left relative">
                    {/* Puntos decorativos */}
                    <div className="hidden lg:flex flex-col absolute -left-8 top-1/3 space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="block w-1 h-1 bg-black rounded-full"></span>
                        ))}
                    </div>

                    <h1 className="text-5xl font-extrabold text-black">EcoSeeds</h1>
                    <p className="text-lg text-gray-700">
                        Siembra vida, deja huella verde.
                    </p>
                </div>

                {/* Imagen de planta */}
                <div className="flex-1 mt-6 lg:mt-0 flex justify-center lg:justify-end relative ml-20">
                    <Image
                        src="/images/planta.png"
                        alt="Planta EcoSeeds"
                        width={1000}
                        height={1000}
                        priority
                    />
                </div>
            </div>

            {/* SECCIÓN DE VALORES */}
            <div className="w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-8 px-8 lg:px-20 py-6">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 max-w-xs">
                        <Image src={item.icon} alt={item.title} width={48} height={48} />
                        <div>
                            <h3 className="text-xl font-semibold text-black mb-1">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
