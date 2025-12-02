import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.tsx";
import Carrito from "./components/Carrito.tsx";
import Pago from "./components/Pago";
import ConfirmPurchase from "./components/ConfirmPurchase";
import ProductosCat from "./components/ProductosCat";
import Escaneo from "./components/Escaneo";
import Pedido from "./components/Pedido";
import Ofertas from "./components/Ofertas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/categoria/:id" element={<ProductosCat />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/confirmacion" element={<ConfirmPurchase />} />
      <Route path="/escaneo" element={<Escaneo />} />
      <Route path="/pedidos" element={<Pedido />} />
      <Route path="ofertas" element={<Ofertas />} />
    </Routes>
  );
}

export default App;
