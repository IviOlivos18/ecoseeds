import Image from 'next/image';

interface StepPosition {
    image: string;
    alt: string;
    position: {
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
        transform?: string;
    };
    width: number;
    height: number;
}

interface HowItWorksProps {
    steps?: StepPosition[];
    containerClass?: string;
}

export default function HowItWorks({
    steps = [
        {
            image: '/images/step_1.png',
            alt: 'Paso 1',
            position: { top: '0', left: '0' },
            width: 400,
            height: 400,
        },
        {
            image: '/images/step_2.png',
            alt: 'Paso 2',
            position: { top: '200px', left: '50%', transform: 'translateX(-50%)' },
            width: 400,
            height: 400,
        },
        {
            image: '/images/step_3.png',
            alt: 'Paso 3',
            position: { top: '0', right: '0' },
            width: 400,
            height: 400,
        },
    ],
    containerClass = 'w-full max-w-7xl mx-auto',
}: HowItWorksProps) {
    return (
        <section className="py-20 px-4 bg-white">
            <div className={containerClass}>
                {/* Contenedor posicional para las 3 imágenes */}
                <div className="relative w-full" style={{ minHeight: '600px' }}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="absolute pointer-events-none"
                            style={{
                                top: step.position.top,
                                left: step.position.left,
                                right: step.position.right,
                                bottom: step.position.bottom,
                                transform: (step.position as any).transform,
                            }}
                        >
                            <Image
                                src={step.image}
                                alt={step.alt}
                                width={step.width}
                                height={step.height}
                                className="rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}