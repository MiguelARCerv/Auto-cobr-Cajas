import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.tsx";
import Carrito from "./components/Carrito.tsx";
import Pago from "./components/Pago";
import ConfirmPurchase from "./components/ConfirmPurchase";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/confirmacion" element={<ConfirmPurchase />} />
    </Routes>
  );
}

export default App;
