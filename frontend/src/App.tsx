import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.tsx";
import Carrito from "./components/Carrito.tsx";
import Pago from "./components/Pago";
import ConfirmPurchase from "./components/ConfirmPurchase";
import ProductosCat from "./components/ProductosCat";
import Escaneo from "./components/Escaneo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/categoria/:id" element={<ProductosCat />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/confirmacion" element={<ConfirmPurchase />} />
      <Route path="/escaneo" element={<Escaneo />} />
    </Routes>
  );
}

export default App;
