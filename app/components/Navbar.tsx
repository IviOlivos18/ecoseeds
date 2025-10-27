import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
    return (
        <nav className="w-full flex items-center justify-between px-8 py-4 ">
            {/* Logo */}
            <div className="find_title text-xl font-semibold text-black">EcoSeeds</div>

            {/* Enlaces centrales */}
            <div className="flex space-x-8">
                <a
                    href="#"
                    className="text-black font-normal relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-500 after:mt-1"
                >
                    Inicio
                </a>
            </div>

            {/* Iconos */}
            <div className="flex items-center space-x-6 text-black">
                {/** Icono de bolsa 
                    <Image
                    src="/icons/bag.svg"
                    alt="Carrito"
                    width={22}
                    height={22}
                    className="cursor-pointer hover:opacity-75 transition"
                    />
                */}
                <Image
                    src="/icons/user.svg"
                    alt="Usuario"
                    width={22}
                    height={22}
                    className="cursor-pointer hover:opacity-75 transition"
                />
                {
                    /* Ícono de búsqueda
                        <Image
                        src="/icons/search.svg"
                        alt="Buscar"
                        width={22}
                        height={22}
                        className="cursor-pointer hover:opacity-75 transition"
                        />
                    */
                }
            </div>
        </nav>
    );
};

export default Navbar;
