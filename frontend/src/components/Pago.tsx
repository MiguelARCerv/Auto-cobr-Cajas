import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmPurchase from "./ConfirmPurchase";

type PaymentMethod = "efectivo" | "tarjeta" | "qr" | "monedero";

const Pago = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("efectivo");
  const [rfc, setRfc] = useState("");
  const [email, setEmail] = useState("");

  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);

  const subtotal = 45;
  const impuestos = 5;
  const total = subtotal + impuestos;

  const handleConfirm = () => {
    setShowConfirmOverlay(true);
  };

  const baseTileClasses =
    "flex flex-col items-center justify-center gap-2 rounded-xl border px-6 py-4 text-sm cursor-pointer transition-colors";

  const isSelected = (method: PaymentMethod) => selectedMethod === method;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6 sm:max-w-lg">
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

        <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <header className="mb-6 flex items-center justify-between">
            <Link
              to="/carrito"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-lg"
              aria-label="Volver al carrito"
            >
              ×
            </Link>
            <h1 className="flex-1 text-center text-lg font-semibold">Pago</h1>
            <div className="w-8" />
          </header>

          <section className="mb-6">
            <h2 className="mb-3 text-base font-semibold">
              Selecciona método de pago
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod("efectivo")}
                className={`${baseTileClasses} ${
                  isSelected("efectivo")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#000000"
                      d="M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm112-96H16a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8Zm-46.35 128H62.35A56.78 56.78 0 0 0 24 145.65v-35.3A56.78 56.78 0 0 0 62.35 72h131.3A56.78 56.78 0 0 0 232 110.35v35.3A56.78 56.78 0 0 0 193.65 184Z"
                    />
                  </svg>
                </span>
                <span>Efectivo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("tarjeta")}
                className={`${baseTileClasses} ${
                  isSelected("tarjeta")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000000"
                      d="M9.944 3.25h4.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.09.673.127 1.456.142 2.363a.755.755 0 0 1 .004.23c.007.566.007 1.178.007 1.84v.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-.662 0-1.274.007-1.84a.757.757 0 0 1 .003-.23c.016-.907.053-1.69.143-2.363c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153Z"
                    />
                  </svg>
                </span>
                <span>Tarjeta</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("qr")}
                className={`${baseTileClasses} ${
                  isSelected("qr")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000000"
                      d="M9 3H3v6h2V5h4V3ZM3 21v-6h2v4h4v2H3ZM15 3v2h4v4h2V3h-6Zm4 12h2v6h-6v-2h4v-4ZM7 7h4v4H7V7Zm0 6h4v4H7v-4Zm10-6h-4v4h4V7Zm-4 6h4v4h-4v-4Z"
                    />
                  </svg>
                </span>
                <span>Código QR</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("monedero")}
                className={`${baseTileClasses} ${
                  isSelected("monedero")
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#000000"
                  >
                    <g
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M20.943 16.835a15.76 15.76 0 0 0-4.476-8.616c-.517-.503-.775-.754-1.346-.986C14.55 7 14.059 7 13.078 7h-2.156c-.981 0-1.472 0-2.043.233c-.57.232-.83.483-1.346.986a15.76 15.76 0 0 0-4.476 8.616C2.57 19.773 5.28 22 8.308 22h7.384c3.029 0 5.74-2.227 5.25-5.165" />
                      <path d="M7.257 4.443c-.207-.3-.506-.708.112-.8c.635-.096 1.294.338 1.94.33c.583-.009.88-.268 1.2-.638C10.845 2.946 11.365 2 12 2s1.155.946 1.491 1.335c.32.37.617.63 1.2.637c.646.01 1.305-.425 1.94-.33c.618.093.319.5.112.8l-.932 1.359c-.4.58-.599.87-1.017 1.035S13.837 7 12.758 7h-1.516c-1.08 0-1.619 0-2.036-.164S8.589 6.38 8.189 5.8zm6.37 8.476c-.216-.799-1.317-1.519-2.638-.98s-1.53 2.272.467 2.457c.904.083 1.492-.097 2.031.412c.54.508.64 1.923-.739 2.304c-1.377.381-2.742-.214-2.89-1.06m1.984-5.06v.761m0 5.476v.764" />
                    </g>
                  </svg>
                </span>
                <span>Monedero</span>
              </button>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="mb-3 text-base font-semibold">
              Información de facturación
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  RFC
                </label>
                <input
                  type="text"
                  value={rfc}
                  onChange={(e) => setRfc(e.target.value)}
                  placeholder="Ingresa tu RFC"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              </div>
            </div>
          </section>

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

          <div className="mb-4 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
            <span className="text-lg">🏅</span>
            <p>Ganarás 50 puntos con esta compra.</p>
          </div>

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
