import { useEffect, useState } from "react";

interface Descuento {
  descuento_id: number;
  producto_id: number;
  tipo: "PORCENTAJE" | "FIJO";
  valor: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const res = await fetch(
          "https://mass-beside-bench-tear.trycloudflare.com/descuentos/"
        );
        const data = await res.json();
        setOfertas(data);
      } catch (err) {
        console.error("Error cargando ofertas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-slate-600">
        Cargando ofertas...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 p-5">
      <h1 className="text-2xl font-semibold mb-6 text-center">Ofertas</h1>

      {ofertas.length === 0 ? (
        <p className="text-center text-slate-500">
          No hay ofertas disponibles por ahora.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ofertas.map((o) => (
            <div
              key={o.descuento_id}
              className="rounded-xl bg-white border shadow-sm hover:shadow-md transition p-4"
            >
              <div className="h-24 w-full rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 mb-3"></div>

              <h2 className="text-sm font-semibold text-slate-900">
                Producto ID: {o.producto_id}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Tipo:{" "}
                <span className="font-medium">
                  {o.tipo === "PORCENTAJE" ? `${o.valor}%` : `$${o.valor} MXN`}
                </span>
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Inicio:{" "}
                <span className="font-medium">
                  {new Date(o.fecha_inicio).toLocaleDateString()}
                </span>
              </p>

              <p className="text-xs text-slate-500">
                Fin:{" "}
                <span className="font-medium">
                  {new Date(o.fecha_fin).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-3 bg-emerald-500 text-white text-xs py-1 px-2 rounded-lg text-center font-semibold">
                Ver producto
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
