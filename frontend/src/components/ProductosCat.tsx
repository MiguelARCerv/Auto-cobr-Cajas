import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FooterNav from "./FooterNav";

interface Producto {
  producto_id: number;
  nombre: string;
  cantidad: string;
  precio: number;
  stock: number;
  codigo: string;
  fecha_caducidad: string | null;
  activo: boolean;
}

export default function ProductosCat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const agregarAlCarrito = (producto: Producto) => {
    let carrito = localStorage.getItem("carrito");
    let items = carrito ? JSON.parse(carrito) : [];

    items.push(producto);

    localStorage.setItem("carrito", JSON.stringify(items));
    setToast(`✔️ ${producto.nombre} agregado al carrito`);

    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(
          `https://mass-beside-bench-tear.trycloudflare.com/productos/categoria/${id}`
        );
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="grow">
          <main className="px-4 py-6">
            {/* Botón regresar SIN azul */}
            <button
              onClick={() => navigate(-1)}
              className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
            >
              ← Regresar
            </button>

            <h1 className="text-2xl font-bold mb-6">
              Productos de la categoría {id}
            </h1>

            {productos.length === 0 && (
              <p className="text-gray-500 text-lg">
                No hay productos en esta categoría.
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-6">
              {productos.map((p) => (
                <div
                  key={p.producto_id}
                  className="bg-white shadow rounded-lg p-2 border border-gray-100 hover:shadow-md transition"
                >
                  <img
                    src={`https://placehold.co/200x150?text=${encodeURIComponent(
                      p.nombre
                    )}`}
                    alt={p.nombre}
                    className="rounded-md mb-2 object-cover w-full h-24"
                  />

                  <h2 className="text-sm font-semibold truncate">{p.nombre}</h2>

                  {/* Precio SIN azul */}
                  <p className="mt-1 text-gray-900 font-bold text-base">
                    ${p.precio.toFixed(2)}
                  </p>

                  <p className="text-xs text-gray-500">Stock: {p.stock}</p>

                  {p.fecha_caducidad && (
                    <p className="text-xs text-gray-500">
                      Caduca: {new Date(p.fecha_caducidad).toLocaleDateString()}
                    </p>
                  )}

                  {/* 🛒 BOTÓN AGREGAR */}
                  <button
                    onClick={() => agregarAlCarrito(p)}
                    className="mt-2 w-full bg-green-600 text-white text-sm py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
        {toast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
            {toast}
          </div>
        )}

        <FooterNav />
      </div>
    </div>
  );
}
