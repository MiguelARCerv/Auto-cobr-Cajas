import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Stage = "filling" | "done";

const ConfirmPurchase = () => {
  const [stage, setStage] = useState<Stage>("filling");
  const navigate = useNavigate();

  const orderId = localStorage.getItem("last_order_id") || "0000";

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("done");
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToOrders = () => {
    navigate(`/pedido/${orderId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white px-6 py-6 shadow-lg">
        <div className="mb-4 text-center">
          <h1 className="text-lg font-semibold text-slate-900">
            Pago completado
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Tu compra se ha procesado correctamente.
          </p>
        </div>

        {/* Círculo de animación */}
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-500 transition-colors duration-700 ${
              stage === "filling" ? "bg-emerald-400/60" : "bg-emerald-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              className={`transition-opacity duration-500 ${
                stage === "done" ? "opacity-100" : "opacity-0"
              }`}
            >
              <path
                fill="white"
                d="M18.353 7.574a.5.5 0 0 0-.707-.008L9.84 15.373l-3.487-3.486a.5.5 0 0 0-.707.707l3.84 3.84a.498.498 0 0 0 .707 0l8.16-8.16a.5.5 0 0 0 0-.7z"
              />
            </svg>
          </div>
        </div>

        <div className="mb-4 text-center text-xs text-slate-600">
          <p>Número de pedido:</p>
          <p className="font-semibold text-slate-900">{orderId}</p>
        </div>

        <div className="space-y-2 text-xs">
          <button
            type="button"
            onClick={handleGoToOrders}
            className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
          >
            Ir a pedido
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchase;
