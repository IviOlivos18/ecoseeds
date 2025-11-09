"use client";

import { useEffect, useState } from "react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    tipoDonacion: string;
}

// Componente ligero de confetti sin librería
function SimpleConfetti() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10,
            delay: Math.random() * 0.2
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute w-2 h-2 animate-pulse"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: ['#10B981', '#34D399', '#6EE7B7', '#FFD700', '#FF69B4'][p.id % 5],
                        animation: `fall ${2 + Math.random()}s linear ${p.delay}s forwards`,
                        borderRadius: ['0%', '50%', '100%'][p.id % 3]
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default function SuccessModal({ isOpen, onClose, tipoDonacion }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.8);
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1);
                    }
                }
            `}</style>

            {/* Confetti ligero */}
            <SimpleConfetti />

            {/* Modal Overlay - Fondo transparente con blur */}
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                animation: 'fadeIn 0.3s ease-out forwards',
                opacity: 0
            }}>
                <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl border-4 border-green-500" style={{
                    animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                    opacity: 0
                }}>
                    {/* Icono de éxito animado */}
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-700 shadow-lg" style={{
                        animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards',
                        opacity: 0
                    }}>
                        <span className="text-4xl animate-bounce">🎉</span>
                    </div>

                    {/* Título con animación */}
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2" style={{
                        animation: 'slideUp 0.5s ease-out 0.2s forwards',
                        opacity: 0
                    }}>
                        ¡Felicitaciones!
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-green-600 font-semibold mb-6" style={{
                        animation: 'slideUp 0.5s ease-out 0.25s forwards',
                        opacity: 0
                    }}>
                        Tu donación fue registrada con éxito.
                    </p>

                    {/* Mensaje */}
                    <p className="text-gray-600 mb-6 leading-relaxed" style={{
                        animation: 'slideUp 0.5s ease-out 0.3s forwards',
                        opacity: 0
                    }}>
                        Tu donación de <span className="font-bold text-green-600">{tipoDonacion}</span> ha sido registrada exitosamente.
                        <br />
                        ¡Gracias por ser parte del cambio y ayudar al medio ambiente! 🌍
                    </p>

                    {/* Iconos decorativos */}
                    <div className="flex justify-center space-x-2 mb-6">
                        <span className="text-3xl animate-bounce">🌱</span>
                        <span className="text-3xl animate-bounce" style={{ animationDelay: '0.1s' }}>🌍</span>
                        <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>💚</span>
                    </div>

                    {/* Botón de cerrar con efecto */}
                    <button
                        onClick={onClose}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105 active:scale-95"
                        style={{
                            animation: 'slideUp 0.5s ease-out 0.35s forwards',
                            opacity: 0
                        }}
                    >
                        ¡Genial! 🚀
                    </button>
                </div>
            </div>
        </>
    );
}