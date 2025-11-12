# EcoSeeds

EcoSeeds es una plataforma diseñada para fomentar las donaciones y apoyar causas ambientales. Este proyecto utiliza tecnologías modernas como Next.js y TypeScript para ofrecer una experiencia de usuario fluida y atractiva.

## Características principales

- **Interfaz moderna**: Diseño intuitivo y responsivo.
- **Modal de éxito**: Animaciones y efectos visuales para celebrar las donaciones exitosas.
- **ChatBot interactivo**: Facilita la interacción con los usuarios y simplifica el proceso de donación.
- **Gestión de estado**: Implementación eficiente para manejar datos y actualizaciones en tiempo real.

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web modernas.
- **TypeScript**: Asegura un código más robusto y mantenible.
- **CSS Modules**: Estilización modular para componentes.
- **PNPM**: Manejador de paquetes rápido y eficiente.

## Estructura del proyecto

```
ecoseeds/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── donaciones/
│           └── route.ts
├── components/
│   ├── ChatBot.tsx
│   ├── ChatMessage.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Hero2.tsx
│   ├── HowItWorks.tsx
│   ├── Navbar.tsx
│   └── SuccessModal.tsx
├── lib/
│   └── db.ts
├── public/
│   ├── icons/
│   └── images/
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Instalación y configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/IviOlivos18/ecoseeds.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd ecoseeds
   ```
3. Instala las dependencias:
   ```bash
   pnpm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.