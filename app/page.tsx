"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import HowItWorks from "./components/HowItWorks";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";


export default function Page() {
    return (
        <>
            <Navbar />
            {/*Secciones*/}
            <Hero />
            <Hero2 />
            <HowItWorks />
            {/* Chatbot */}
            <ChatBot />
            <Footer />
        </>
    );
}
