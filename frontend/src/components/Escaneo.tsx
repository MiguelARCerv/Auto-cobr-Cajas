import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const PRODUCTOS_MOCK: Record<string, any> = {
  "7501055336782": {
    producto_id: 1,
    nombre: "Coca Cola 600ml",
    cantidad: "600ml",
    codigo: "7501055336782",
    precio: 18.5,
    fecha_caducidad: "2025-12-31",
    stock: 100,
    activo: true,
  },
  EH00101: {
    producto_id: 2,
    nombre: "Plancha eléctrica",
    cantidad: "1 pza",
    codigo: "EH00101",
    precio: 399,
    fecha_caducidad: null,
    stock: 25,
    activo: true,
  },
  EH00102: {
    producto_id: 3,
    nombre: "Tostador",
    cantidad: "1 pza",
    codigo: "EH00102",
    precio: 549,
    fecha_caducidad: null,
    stock: 18,
    activo: true,
  },
};

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

    const verificarProducto = () => {
      const producto = PRODUCTOS_MOCK[data!];

      if (producto) {
        agregarAlCarrito(producto);
      } else {
        setToast("❌ Producto no encontrado");
        setTimeout(() => setToast(null), 2000);
      }

      setTimeout(() => {
        setLoadingProduct(false);
        setData(null);
      }, 1500);
    };

    verificarProducto();
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
                console.log("ESCANEADO:", code);
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
