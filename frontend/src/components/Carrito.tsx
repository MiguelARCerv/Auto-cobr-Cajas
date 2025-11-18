import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  price: number; // precio unitario
  unit: string;
  quantity: number;
}

interface SuggestedItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
}

const mockItems: CartItem[] = [
  {
    id: 1,
    name: "Manzanas orgánicas",
    subtitle: "$3.50 / kg",
    price: 3.5,
    unit: "kg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Pan integral",
    subtitle: "$4.00 / pieza",
    price: 4,
    unit: "pieza",
    quantity: 2,
  },
  {
    id: 3,
    name: "Leche de almendra",
    subtitle: "$4.00 / litro",
    price: 4,
    unit: "litro",
    quantity: 1,
  },
];

const suggestedItems: SuggestedItem[] = [
  {
    id: 101,
    name: "Yogurt natural",
    subtitle: "Pack 4 piezas",
    price: 3.2,
  },
  {
    id: 102,
    name: "Queso panela",
    subtitle: "300 g",
    price: 4.8,
  },
  {
    id: 103,
    name: "Cereal integral",
    subtitle: "Caja 500 g",
    price: 5.5,
  },
];

const Carrito: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(mockItems);
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleIncrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleApplyCoupon = () => {
    if (coupon.trim()) {
      console.log("Aplicar cupón:", coupon);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Progreso de compra */}
        <nav className="mb-6 flex items-center justify-center gap-4 text-xs font-medium">
          {/* Paso 1: completado */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              ✓
            </div>
            <span className="text-emerald-500">Selección</span>
          </div>
          <div className="h-px w-8 bg-emerald-300" />
          {/* Paso 2: actual */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              2
            </div>
            <span className="text-emerald-500">Carrito</span>
          </div>
          <div className="h-px w-8 bg-emerald-100" />
          {/* Paso 3: pendiente */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-semibold text-slate-400">
              3
            </div>
            <span className="text-slate-400">Pago</span>
          </div>
          <div className="h-px w-8 bg-slate-100" />
          {/* Paso 4: pendiente */}
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
              aria-label="Volver al inicio"
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
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={`flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-4 border-b border-slate-100 ${
                    index === items.length - 1 ? "last:border-b-0" : ""
                  }`}
                >
                  {/* Mini imagen / inicial */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 text-white text-lg flex-shrink-0">
                    {item.name.charAt(0)}
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>

                  {/* Controles de cantidad y precio */}
                  <div className="flex items-center justify-between gap-4 md:w-56">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 text-lg leading-none"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-lg leading-none"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right text-sm font-semibold text-slate-900 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recomendaciones */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">
            También te podría gustar
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {suggestedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <div className="mb-2 h-20 w-full rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100" />
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">{item.subtitle}</p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  type="button"
                  className="mt-2 w-full rounded-lg bg-emerald-500 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cupón y resumen */}
        <section className="mt-8 grid gap-8 md:grid-cols-[2.2fr,1.3fr]">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              Cupón de descuento
            </h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Ingresa tu código de cupón"
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Aplicar
              </button>
            </div>
          </div>

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
              type="button"
              onClick={() => navigate("/pago")}
              className="mt-3 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
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
