"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import HowItWorks from "./components/HowItWorks";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import SuccessModal from "./components/SuccessModal";


export default function Page() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [tipoDonacion, setTipoDonacion] = useState("");

    const handleDonacionSuccess = (tipo: string) => {
        setTipoDonacion(tipo);
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setTipoDonacion("");
    };

    return (
        <>
            <Navbar />
            {/*Secciones*/}
            <Hero />
            <Hero2 />
            <HowItWorks />
            {/* Chatbot */}
            <ChatBot onDonacionSuccess={handleDonacionSuccess} />
            <Footer />

            {/* Modal de éxito global */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleCloseModal}
                tipoDonacion={tipoDonacion}
            />
        </>
    );
}
