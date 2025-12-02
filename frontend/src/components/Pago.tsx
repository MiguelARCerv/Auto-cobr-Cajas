import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmPurchase from "./ConfirmPurchase";

type PaymentMethod = "efectivo" | "tarjeta" | "qr" | "monedero";

const Pago = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("efectivo");

  const [rfc, setRfc] = useState("");
  const [email, setEmail] = useState("");

  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);

  // 🔥 SUBTOTAL, IMPUESTOS Y TOTAL desde localStorage
  const [subtotal, setSubtotal] = useState<number>(0);
  const [impuestos, setImpuestos] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      const items = JSON.parse(stored);

      // 🔥 Calculamos subtotal basado en precio * cantidad
      const newSubtotal = items.reduce(
        (acc: number, item: any) => acc + item.precio * (item.quantity || 1),
        0
      );

      setSubtotal(newSubtotal);

      // 🔥 Impuestos (si quieres cambiarlo a 16% solo lo digo)
      const newImpuestos = newSubtotal * 0.11; // 11% o ajusta el porcentaje
      setImpuestos(newImpuestos);

      setTotal(newSubtotal + newImpuestos);
    }
  }, []);

  const handleConfirm = async () => {
    // Leer carrito
    const carritoStr = localStorage.getItem("carrito");
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    // Construir datos REALES para pedidos (coinciden con la DB)
    const pedidoPayload = {
      subtotal: subtotal,
      descuento_total: 0,
      impuesto_total: impuestos,
      total_final: total,
      estado: "PAGADO",
    };

    try {
      const res = await fetch(
        "https://mass-beside-bench-tear.trycloudflare.com/pedidos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedidoPayload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Error backend:", data);
        alert("Error al crear pedido");
        return;
      }

      // Guardar ID del pedido
      localStorage.setItem("last_order_id", data.pedido_id);

      // Vaciar carrito
      localStorage.removeItem("carrito");

      // Mostrar pantalla de confirmación
      setShowConfirmOverlay(true);
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el backend");
    }
  };

  const baseTileClasses =
    "flex flex-col items-center justify-center gap-2 rounded-xl border px-6 py-4 text-sm cursor-pointer transition-colors";

  const isSelected = (method: PaymentMethod) => selectedMethod === method;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6 sm:max-w-lg">
        {/* 🔄 Pasos */}
        <nav className="mb-6 flex items-center justify-center gap-3 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              ✓
            </div>
            <span className="text-emerald-500">Selección</span>
          </div>

          <div className="h-px w-6 bg-emerald-300" />

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              2
            </div>
            <span className="text-emerald-500">Carrito</span>
          </div>

          <div className="h-px w-6 bg-emerald-300" />

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
              3
            </div>
            <span className="text-emerald-500">Pago</span>
          </div>

          <div className="h-px w-6 bg-emerald-100" />

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-semibold text-slate-400">
              4
            </div>
            <span className="text-slate-400">Confirmar</span>
          </div>
        </nav>

        {/* Contenedor principal */}
        <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <header className="mb-6 flex items-center justify-between">
            <Link
              to="/carrito"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-lg"
            >
              ×
            </Link>
            <h1 className="flex-1 text-center text-lg font-semibold">Pago</h1>
            <div className="w-8" />
          </header>

          {/* Métodos de pago */}
          <section className="mb-6">
            <h2 className="mb-3 text-base font-semibold">
              Selecciona método de pago
            </h2>

            {/* ... botones de pago igual que antes ... */}
            {/* LOS BOTONES NO SE MODIFICAN, SIGUEN EXACTOS */}

            <div className="grid grid-cols-2 gap-3">
              {/* Efectivo */}
              <button
                type="button"
                onClick={() => setSelectedMethod("efectivo")}
                className={`${baseTileClasses} ${
                  isSelected("efectivo")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                💵
                <span>Efectivo</span>
              </button>

              {/* Tarjeta */}
              <button
                type="button"
                onClick={() => setSelectedMethod("tarjeta")}
                className={`${baseTileClasses} ${
                  isSelected("tarjeta")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                💳
                <span>Tarjeta</span>
              </button>

              {/* QR */}
              <button
                type="button"
                onClick={() => setSelectedMethod("qr")}
                className={`${baseTileClasses} ${
                  isSelected("qr")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                📱
                <span>QR</span>
              </button>

              {/* Monedero */}
              <button
                type="button"
                onClick={() => setSelectedMethod("monedero")}
                className={`${baseTileClasses} ${
                  isSelected("monedero")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                🪙
                <span>Monedero</span>
              </button>
            </div>
          </section>

          {/* Facturación */}
          <section className="mb-6">
            <h2 className="mb-3 text-base font-semibold">
              Información de facturación
            </h2>

            <div className="space-y-3 text-sm">
              {/* RFC */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  RFC
                </label>
                <input
                  type="text"
                  value={rfc}
                  onChange={(e) => setRfc(e.target.value)}
                  placeholder="Ingresa tu RFC"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
          </section>

          {/* 🔥 RESUMEN REAL */}
          <section className="mb-4">
            <h2 className="mb-3 text-base font-semibold">Resumen de compra</h2>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">Impuestos</span>
                <span>${impuestos.toFixed(2)}</span>
              </div>

              <div className="my-2 h-px bg-slate-200" />

              <div className="flex items-center justify-between py-1 text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Puntos */}
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
            <span className="text-lg">🏅</span>
            <p>Ganarás 50 puntos con esta compra.</p>
          </div>

          {/* Botón confirmar */}
          <button
            type="button"
            onClick={handleConfirm}
            className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
          >
            Confirmar pago
          </button>
        </div>
      </div>

      {showConfirmOverlay && <ConfirmPurchase />}
    </div>
  );
};

export default Pago;
