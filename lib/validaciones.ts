const TIPOS_VALIDOS = ['Tierra', 'Herramienta', 'Planta'];

export function validarDonacion(body: any) {
  const { nombre, direccion, telefono, tipo_donacion } = body ?? {};
  if (!nombre?.trim() || !direccion?.trim() || !telefono?.trim() || !tipo_donacion?.trim()) {
    return 'Faltan campos requeridos';
  }
  if (!telefono.startsWith('+')) return 'El teléfono debe comenzar con +';
  if (!TIPOS_VALIDOS.includes(tipo_donacion)) return 'Tipo de donación inválido';
  return null;
}