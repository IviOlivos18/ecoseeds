"use client";

interface ChatMessageProps {
    children: React.ReactNode;
}

export default function ChatMessage({ children }: ChatMessageProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-gray-200 w-full">
            {children}
        </div>
    );
}
