"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChatMessage from "./ChatMessage";

interface ChatBotProps {
    onDonacionSuccess?: (tipo: string) => void;
}

export default function ChatBot({ onDonacionSuccess }: ChatBotProps) {

    async function enviarDonacion(data: any) {
        const res = await fetch('http://localhost/ecoseeds-master/backend/donaciones.php', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return res.json();
    }

    const [isOpen, setIsOpen] = useState(false);
    const [showStep2, setShowStep2] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nombre: "", direccion: "", telefono: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const options = [
        { id: 1, label: "Tierra", emoji: <img src="/icons/tierra.png" width={40} alt="Tierra" /> },
        { id: 2, label: "Herramienta", emoji: "🧰" },
        { id: 3, label: "Planta", emoji: "🌱" }
    ];

    const handleSelectOption = (label: string) => {
        setSelectedOption(label);
        setShowStep2(true);
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            }
        }, 100);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validación en tiempo real
        const newErrors = { ...errors };

        if (name === "nombre") {
            if (!value) {
                newErrors.nombre = "El nombre es requerido";
            } else if (value.length < 3) {
                newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
            } else {
                delete newErrors.nombre;
            }
        }

        if (name === "direccion") {
            if (!value) {
                newErrors.direccion = "La dirección es requerida";
            } else if (value.length < 5) {
                newErrors.direccion = "La dirección debe tener al menos 5 caracteres";
            } else {
                delete newErrors.direccion;
            }
        }

        if (name === "telefono") {
            if (!value) {
                newErrors.telefono = "El teléfono es requerido";
            } else if (!value.startsWith('+')) {
                newErrors.telefono = "El teléfono debe comenzar con +";
            } else if (value.length < 10) {
                newErrors.telefono = "El teléfono debe tener al menos 10 caracteres";
            } else {
                delete newErrors.telefono;
            }
        }

        setErrors(newErrors);
    };

    const handleSubmit = async () => {
        // Si hay errores en los campos, no continuar
        if (Object.keys(errors).length > 0) {
            return;
        }

        if (!formData.nombre || !formData.direccion || !formData.telefono) {
            alert("Por favor completa todos los campos");
            return;
        }

        if (!selectedOption) {
            alert("Por favor selecciona un tipo de donación");
            return;
        }

        try {
            const data = await enviarDonacion({
                nombre_completo: formData.nombre,
                direccion: formData.direccion,
                telefono: formData.telefono,
                tipo_donacion: selectedOption
            });

            if (!data.error) {
                setShowStep2(false);
                setSelectedOption(null);
                setFormData({ nombre: "", direccion: "", telefono: "" });
                setErrors({});
                onDonacionSuccess?.(selectedOption || "");
            } else {
                setErrors({ submit: data.error });
            }

        } catch (error) {
            console.error("Error al enviar:", error);
            setErrors({ submit: "No se pudo procesar la donación." });
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-shadow border-2 border-black cursor-pointer"
            >
                {isOpen ? (
                    <span className="text-2xl font-bold text-black">✕</span>
                ) : (
                    <Image
                        src="/images/plant.svg"
                        alt="Chat"
                        width={40}
                        height={40}
                    />
                )}
            </button>

            {isOpen && (
                <div className="fixed bottom-28 right-8 w-110 bg-white rounded-2xl shadow-2xl flex flex-col z-40 border-10 border-black" style={{ height: "80vh", borderRadius: '24px' }}>
                    <div className="bg-white border-b-2 border-gray-300 p-6 flex items-center gap-3 rounded-t-2xl">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                            <span className="text-lg">🌿</span>
                        </div>
                        <h3 className="font-bold text-black text-lg">Asistente donativo</h3>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto p-6 space-y-4 bg-green-100 rounded-b-2xl"
                    >
                        <ChatMessage>
                            <p className="text-black font-semibold text-base mb-6">
                                Elige lo que quieres donar y sé parte del cambio.
                            </p>

                            <div className="grid grid-cols-3 gap-4">
                                {options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelectOption(option.label)}
                                        className={`flex flex-col items-center justify-center bg-white border-2 rounded-lg transition cursor-pointer ${
                                            selectedOption === option.label
                                                ? "border-emerald-400 shadow-lg"
                                                : "border-gray-300 hover:border-emerald-400 hover:shadow-md"
                                        }`}
                                    >
                                        <span className="text-4xl mb-2 pt-2">{option.emoji}</span>
                                        <span className="text-sm font-semibold text-black">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </ChatMessage>

                        {showStep2 && (
                            <ChatMessage>
                                <p className="text-black font-semibold text-base mb-6">
                                    Llena los siguientes campos:
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-gray-600 text-sm block mb-2">Nombre Completo:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleFormChange}
                                            className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none text-black transition ${
                                                errors.nombre ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-green-600"
                                            }`}
                                        />
                                        {errors.nombre && (
                                            <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-gray-600 text-sm block mb-2">Dirección:</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            value={formData.direccion}
                                            onChange={handleFormChange}
                                            className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none text-black transition ${
                                                errors.direccion ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-green-600"
                                            }`}
                                        />
                                        {errors.direccion && (
                                            <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-gray-600 text-sm block mb-2">Teléfono:</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleFormChange}
                                            className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none text-black transition ${
                                                errors.telefono ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-green-600"
                                            }`}
                                        />
                                        {errors.telefono && (
                                            <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
                                        )}
                                    </div>

                                    {errors.submit && (
                                        <p className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                                            {errors.submit}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-full transition border-2 border-black mt-6 cursor-pointer"
                                >
                                    Enviar
                                </button>
                            </ChatMessage>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
