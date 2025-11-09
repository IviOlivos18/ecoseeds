import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { nombre, direccion, telefono, tipo_donacion } = await request.json();

        // Validaciones básicas
        if (!nombre || !direccion || !telefono || !tipo_donacion) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Validar que el teléfono empiece con +
        if (!telefono.startsWith('+')) {
            return NextResponse.json(
                { error: 'El teléfono debe comenzar con +' },
                { status: 400 }
            );
        }

        // Validar tipo de donación
        const tiposValidos = ['Tierra', 'Herramienta', 'Planta'];
        if (!tiposValidos.includes(tipo_donacion)) {
            return NextResponse.json(
                { error: 'Tipo de donación inválido' },
                { status: 400 }
            );
        }

        // Obtener conexión del pool
        const connection = await pool.getConnection();

        try {
            // Insertar en la base de datos
            const [result] = await connection.execute(
                'INSERT INTO Donadores (nombre_completo, direccion, telefono, tipo_donacion) VALUES (?, ?, ?, ?)',
                [nombre, direccion, telefono, tipo_donacion]
            );

            return NextResponse.json(
                { 
                    message: '¡Donación registrada exitosamente!',
                    data: result
                },
                { status: 201 }
            );
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error al registrar donación:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
