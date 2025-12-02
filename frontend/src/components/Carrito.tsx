import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface CartItem {
  producto_id: number;
  nombre: string;
  precio: number;
  stock: number;
  cantidad?: string;
  codigo?: string;
  fecha_caducidad?: string | null;
  activo?: boolean;

  // Campos derivados
  quantity: number;
  subtitle?: string;
}

const Carrito: React.FC = () => {
  const navigate = useNavigate();

  // 🔥 Cargar carrito REAL desde localStorage
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      const parsed = JSON.parse(stored);

      // Convertir productos del catálogo a CartItem real
      const normalized = parsed.map((p: any) => ({
        producto_id: p.producto_id,
        nombre: p.nombre,
        precio: p.precio,
        subtitle: p.cantidad || "",
        quantity: 1, // valor por defecto
      }));

      setItems(normalized);
    }
  }, []);

  // 🔥 Guardar en localStorage cada vez que cambie el carrito
  const syncLocalStorage = (newItems: CartItem[]) => {
    localStorage.setItem("carrito", JSON.stringify(newItems));
    setItems(newItems);
  };

  // ➕ Aumentar cantidad
  const handleIncrease = (id: number) => {
    const updated = items.map((item) =>
      item.producto_id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    syncLocalStorage(updated);
  };

  // ➖ Disminuir cantidad o eliminar si llega a 0
  const handleDecrease = (id: number) => {
    const updated = items
      .map((item) =>
        item.producto_id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // eliminar del carrito

    syncLocalStorage(updated);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Progreso */}
        <nav className="mb-6 flex items-center justify-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              ✓
            </div>
            <span className="text-emerald-500">Selección</span>
          </div>
          <div className="h-px w-8 bg-emerald-300" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              2
            </div>
            <span className="text-emerald-500">Carrito</span>
          </div>
          <div className="h-px w-8 bg-emerald-100" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-semibold text-slate-400">
              3
            </div>
            <span className="text-slate-400">Pago</span>
          </div>
          <div className="h-px w-8 bg-slate-100" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-semibold text-slate-400">
              4
            </div>
            <span className="text-slate-400">Confirmar</span>
          </div>
        </nav>

        {/* Encabezado */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-lg"
            >
              ←
            </Link>
            <h1 className="text-2xl font-semibold">Carrito de compras</h1>
          </div>

          <p className="text-sm text-slate-500">
            {itemsCount} artículo{itemsCount !== 1 ? "s" : ""}
          </p>
        </header>

        {/* Lista de productos */}
        <section className="rounded-xl bg-white shadow-sm border border-slate-100">
          {items.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">Tu carrito está vacío.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li
                  key={item.producto_id}
                  className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-4 border-b border-slate-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 text-white text-lg">
                    {item.nombre.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.nombre}
                    </p>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:w-56">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.producto_id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700"
                      >
                        −
                      </button>

                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncrease(item.producto_id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right text-sm font-semibold text-slate-900">
                      ${(item.precio * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Resumen */}
        <section className="mt-8 grid gap-8 md:grid-cols-[2.2fr,1.3fr]">
          <aside className="rounded-xl bg-white shadow-sm border border-slate-100 p-4 space-y-2 text-sm">
            <h2 className="text-base font-semibold text-slate-900">Resumen</h2>

            <div className="flex justify-between text-slate-600">
              <span>Artículos ({itemsCount})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Envío</span>
              <span>Gratis</span>
            </div>

            <div className="my-2 h-px bg-slate-100" />

            <div className="flex justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/pago")}
              className="mt-3 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Continuar al pago
            </button>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Carrito;
