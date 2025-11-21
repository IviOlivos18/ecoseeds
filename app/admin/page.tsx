"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [donadores, setDonadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);

  // Cargar donadores desde PHP
  async function cargarDonadores() {
    try {
      const res = await fetch("http://localhost/ecoseeds-master/backend/donaciones.php");
      const data = await res.json();
      setDonadores(data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando donadores:", err);
    }
  }

  useEffect(() => {
    cargarDonadores();
  }, []);

  // Borrar donador
  async function borrar(id: number) {
    if (!confirm("¿Seguro que deseas eliminarlo?")) return;

    try {
      const res = await fetch(
        `http://localhost/ecoseeds-master/backend/donaciones.php?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Error eliminando");

      cargarDonadores();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }

  // Guardar cambios (editar)
  async function guardarCambios() {
    try {
      const res = await fetch(
        `http://localhost/ecoseeds-master/backend/donaciones.php?id=${editing.id_donador}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        }
      );

      if (!res.ok) throw new Error("Error actualizando");

      setEditing(null);
      cargarDonadores();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  }

  if (loading)
    return <p className="text-center mt-10 text-black">Cargando datos...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-black mb-5">
        Panel de administración
      </h1>

      {/* Tabla */}
      <table className="w-full border border-black bg-white">
        <thead className="bg-gray-200 text-black">
          <tr>
            <th className="border border-black p-2">ID</th>
            <th className="border border-black p-2">Nombre</th>
            <th className="border border-black p-2">Dirección</th>
            <th className="border border-black p-2">Teléfono</th>
            <th className="border border-black p-2">Tipo</th>
            <th className="border border-black p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {donadores.map((d: any) => (
            <tr key={d.id_donador} className="text-black">
              <td className="border border-black p-2">{d.id_donador}</td>
              <td className="border border-black p-2">{d.nombre_completo}</td>
              <td className="border border-black p-2">{d.direccion}</td>
              <td className="border border-black p-2">{d.telefono}</td>
              <td className="border border-black p-2">{d.tipo_donacion}</td>

              <td className="border border-black p-2 text-center">
                <button
                  className="bg-blue-500 text-black px-3 py-1 border-2 border-black rounded mr-2 cursor-pointer"
                  onClick={() => setEditing(d)}
                >
                  Editar
                </button>

                <button
                  className="bg-red-500 text-black px-3 py-1 border-2 border-black rounded cursor-pointer"
                  onClick={() => borrar(d.id_donador)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg border-2 border-black w-96">
            <h2 className="text-xl font-bold text-black mb-4">
              Editar donación #{editing.id_donador}
            </h2>

            <label className="text-black">Nombre:</label>
            <input
              className="w-full border-2 border-black p-2 mb-2"
              value={editing.nombre_completo}
              onChange={(e) =>
                setEditing({ ...editing, nombre_completo: e.target.value })
              }
            />

            <label className="text-black">Dirección:</label>
            <input
              className="w-full border-2 border-black p-2 mb-2"
              value={editing.direccion}
              onChange={(e) =>
                setEditing({ ...editing, direccion: e.target.value })
              }
            />

            <label className="text-black">Teléfono:</label>
            <input
              className="w-full border-2 border-black p-2 mb-2"
              value={editing.telefono}
              onChange={(e) =>
                setEditing({ ...editing, telefono: e.target.value })
              }
            />

            <label className="text-black">Tipo de donación:</label>
            <select
              className="w-full border-2 border-black p-2 mb-4"
              value={editing.tipo_donacion}
              onChange={(e) =>
                setEditing({ ...editing, tipo_donacion: e.target.value })
              }
            >
              <option value="Tierra">Tierra</option>
              <option value="Herramienta">Herramienta</option>
              <option value="Planta">Planta</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 border-2 border-black px-3 py-1 cursor-pointer"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </button>

              <button
                className="bg-green-500 border-2 border-black px-3 py-1 cursor-pointer"
                onClick={guardarCambios}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
