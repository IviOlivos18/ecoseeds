"use client";

export default function Footer() {
    return (
        <footer 
            className="w-full bg-green-100"
            style={{
                display: 'flex',
                padding: '18px 498px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <p className="text-center text-gray-600 text-sm">
                Developed by Ivi, Janith y Elias
            </p>
        </footer>
    );
}
