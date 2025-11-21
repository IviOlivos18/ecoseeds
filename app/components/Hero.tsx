"use client";

import Image from "next/image";
import '../globals.css';

export default function Hero() {
    const items = [
        {
            title: "Regenerar",
            text: "Devolvemos vida a la tierra, restaurando ecosistemas y sembrando futuro.",
            icon: "/images/reforestation.svg",
        },
        {
            title: "Unir",
            text: "Promovemos la conciencia ambiental e inspiramos a otros a sumarse al cambio.",
            icon: "/images/save-earth.svg",
        },
        {
            title: "Cuidar",
            text: "Protegemos cada árbol plantado, asegurando su crecimiento y un impacto duradero.",
            icon: "/images/save-world.svg",
        },
    ];
    

    return (
        <section className="w-full flex flex-col bg-white relative">
            {/* HERO PRINCIPAL */}
            <div className="relative w-full min-h-[400px] flex items-center">
                {/* Lado izquierdo - Texto */}
                <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 w-1/2">
                    <div className="max-w-lg flex gap-6">
                        {/* Puntos decorativos */}
                        <div className="flex flex-col space-y-3 justify-center">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="block w-1.5 h-1.5 bg-black rounded-full"></span>
                            ))}
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-5xl font-extrabold text-black change-font">EcoSeeds</h1>
                            <p className="text-base text-gray-700 mt-2">
                                Siembra vida, deja huella verde.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Imagen de planta - Posición absoluta para que se vea solo en Hero y Hero2 */}
            <div className="absolute pointer-events-none z-10" style={{ width: '50%', left: '50%', top: '-250px', height: 'auto' }}>
                <Image
                    src="/images/planta.webp"
                    alt="Planta EcoSeeds"
                    width={1600}
                    height={1820}
                    priority
                    className="scale-65 origin-right"
                />
            </div>

            {/* SECCIÓN DE VALORES */}
            <div className="w-full relative z-20 flex justify-start px-8 lg:px-20 py-16">
                <div className="grid grid-cols-3 gap-12 w-2/3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Image 
                                src={item.icon} 
                                alt={item.title} 
                                width={56} 
                                height={56}
                                className="shrink-0"
                            />
                            <div>
                                <h3 className="text-xl font-semibold text-black mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-700 text-sm leading-relaxed text-justify">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
