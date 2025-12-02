import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Escaneo() {
  const [data, setData] = useState<string | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // 🔥 Agregar al carrito
  const agregarAlCarrito = (producto: any) => {
    let carrito = localStorage.getItem("carrito");
    let items = carrito ? JSON.parse(carrito) : [];

    items.push({
      ...producto,
      quantity: 1,
    });

    localStorage.setItem("carrito", JSON.stringify(items));

    setToast(`✔️ ${producto.nombre} agregado al carrito`);
    setTimeout(() => setToast(null), 2000);
  };

  // 🔥 Lógica cuando se escanea
  useEffect(() => {
    if (!data || loadingProduct) return;

    setLoadingProduct(true);

    const fetchProducto = async () => {
      try {
        const res = await fetch(
          `https://having-reasonable-injured-protecting.trycloudflare.com/productos/codigo/${data}`
        );
        const result = await res.json();

        if (res.ok && result) {
          agregarAlCarrito(result);
        } else {
          setToast("❌ Producto no encontrado");
          setTimeout(() => setToast(null), 2000);
        }
      } catch (error) {
        console.log(error);
        setToast("⚠️ Error al consultar producto");
        setTimeout(() => setToast(null), 2000);
      } finally {
        // Espera antes de permitir otro escaneo
        setTimeout(() => {
          setLoadingProduct(false);
          setData(null);
        }, 1500);
      }
    };

    fetchProducto();
  }, [data, loadingProduct]);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col">
      <header className="p-4 text-center font-semibold text-lg bg-white border-b">
        Escanear producto
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="rounded-xl overflow-hidden border shadow-lg bg-black">
          <BarcodeScannerComponent
            width={380}
            height={280}
            onUpdate={(_, result) => {
              if (result) {
                const code = result.getText();
                console.log("ESCANEADO:", code); // 🔥 Monitor para saber si detecta
                if (code) setData(code);
              }
            }}
          />
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  );
}
