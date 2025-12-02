import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryImages } from "../constants/categoryImages";
import Header from "./Header";
import BannerPromo from "./BannerPromo";
import FooterNav from "./FooterNav";

// const stores = [
//   {
//     id: 1,
//     name: "Supermercado El Sol",
//     eta: "Entrega en 15-20 min",
//     highlighted: true,
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
//   },
//   {
//     id: 2,
//     name: "Tienda La Esquina",
//     eta: "Entrega en 25-30 min",
//     highlighted: false,
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
//   },
// ];

export const Menu: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      "https://having-reasonable-injured-protecting.trycloudflare.com/categorias/"
    )
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="grow">
          {/* HEADER */}
          <Header />

          {/* MAIN */}
          <main className="px-4">
            {/* Buscador */}
            <div className="relative my-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full rounded-full border-none bg-white py-3 pl-12 pr-4 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Banner promo */}
            <BannerPromo />

            {/* Categorías */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Categorías</h2>
              <button className="text-sm font-semibold text-sky-600">
                Ver todo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-6">
              {categories.map((cat: any) => (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/categoria/${cat.categoria_id}`)}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-sm w-full max-w-[5.5rem]">
                    <img
                      src={
                        categoryImages[cat.id] ??
                        "https://via.placeholder.com/80"
                      }
                      alt={cat.nombre}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium text-center">
                    {cat.nombre}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>

        <FooterNav />
      </div>
    </div>
  );
};

export default Menu;
