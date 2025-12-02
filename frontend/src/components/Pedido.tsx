import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Pedido {
  pedido_id: number;
  fecha: string;
  subtotal: number;
  descuento_total: number;
  impuesto_total: number;
  total_final: number;
  estado: string;
}

export default function Pedido() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(
          "https://mass-beside-bench-tear.trycloudflare.com/pedidos/"
        );
        const data = await res.json();

        setPedidos(data);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-slate-600">
        Cargando pedidos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Mis pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-center text-slate-500">No tienes pedidos aún.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((p) => (
            <div
              key={p.pedido_id}
              onClick={() => navigate(`/pedido/${p.pedido_id}`)}
              className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-500">
                  Pedido #{p.pedido_id}
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  ${p.total_final.toFixed(2)}
                </span>
              </div>

              <div className="text-xs text-slate-500">
                <p>
                  Fecha:{" "}
                  <span className="font-medium">
                    {new Date(p.fecha).toLocaleString()}
                  </span>
                </p>

                <p className="mt-1">
                  Subtotal:{" "}
                  <span className="font-medium">${p.subtotal.toFixed(2)}</span>
                </p>

                <p className="mt-1">
                  Impuestos:{" "}
                  <span className="font-medium">
                    ${p.impuesto_total.toFixed(2)}
                  </span>
                </p>

                <p className="mt-1">
                  Descuento:{" "}
                  <span className="font-medium">
                    ${p.descuento_total.toFixed(2)}
                  </span>
                </p>

                <p className="mt-1">
                  Estado:{" "}
                  <span className="font-medium capitalize">{p.estado}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
