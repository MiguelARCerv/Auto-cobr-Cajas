import React from "react";
import { Link } from "react-router-dom";

const stores = [
  {
    id: 1,
    name: "Supermercado El Sol",
    eta: "Entrega en 15-20 min",
    highlighted: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
  {
    id: 2,
    name: "Tienda La Esquina",
    eta: "Entrega en 25-30 min",
    highlighted: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
];

const categories = [
  {
    id: 1,
    name: "Alcohol",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
  {
    id: 2,
    name: "Farmacia",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
  {
    id: 3,
    name: "Panadería",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxtqLQyeV3vg0pRQNisv0r11Hq1XB1AKiSWT4-2THmRnJipYZVCQ5HZVJij6IAifZk9MwM1-o1hxbgQSb2VEDgHgec6HlC1Czr6TYowV3ue7jn2FwItLFqu4Lnkbj8TGvl23bI730lhuMN9hkpSq1DmUn-Ao8oNwOiRAFrfHoFt-NhAkTpiSJhEax8H2W-tzVszUT1IGT5EFH7T8e9U0YPsYknS3b5Q1qx8bBq55flegYMT8B64f97AKkA81StmWiZ1w8u_IYBvno",
  },
  {
    id: 4,
    name: "Pescadería",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj97YAMMVyultGgxSX-N7WWFiVsKs-2ZILN2A9dEgMfBdVZrUlELdeng6l5xTrJpuyVZnU2R13RwfNs6T_Tz2vlnFubWxBMER8MOr2fpE6l9Xqvi_EtQqsEh-aK8pW2ngqkKKMJaPtrbkEG2zZKn9eT5HaYIqx8VXzPxPEq_zVjq7qImnE9k0UKt54v7o8m13Z6uyBEgJUGogr6sphqsuzvSJFx3yakpGAsU50-7RnJKbwhzo7ocE-nIzELrwhMtXTqHSoU52TqEE",
  },
  {
    id: 5,
    name: "Frutas",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDCY7gUDUH04bEV-0XuN9jU_0U34nCJaJbXiFCIC9ui44UaY7VpoQD-nvaU73RXKG5sERPIAbzps-VS2uMmBidxb9fU9CT5cXCORdAe8iv_nRDG7d1bSCPU6mThJiba0J_eGSbcXlSEW7uy5mIpvKBPM4S0GBqc2dxFLy7Ee3ngKRwO5Dcc-Td6zIrrz4qUqrsE4TlnVTK3YRFKNEh3eQF738NhVHUmEsR0ZwEOvS6aQ9e4wkzXD2TBy_LCruXNCNZNwccUa7DT5c",
  },
  {
    id: 6,
    name: "Verduras",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
  {
    id: 7,
    name: "Bebidas",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
  {
    id: 8,
    name: "Lácteos",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWl2DABGJ1YqP0VcWqxQV59NGAj2M5c3maIrnMrRZANrgunjsIvzpF5KnZO0PbkDIJxZTsJmew4pUMJICOk40Rviam6j97bbz0KYjB6jd2hg_NzXjzjzOXyyArz1OGH6DranM3IgBf4DWU_3tbgIEPeF1hnPBdwJztCZ0x-sV3D0R4Xw2j5JT_QhUkkCEp_KxjxW4OWQGrbOAAeZrA38_QP6wTMjccpaciGFSsQ7-LOMsglJ2o_RNugiofnAbi0jG2xHB9sLXqw4",
  },
];

export const Menu: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="flex-grow">
          {/* HEADER */}
          <header className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm px-4 pt-4 pb-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Entregar en</span>
                <div className="flex items-center gap-1 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000000"
                      d="M12.003 11.73q.668 0 1.14-.475q.472-.475.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.476q-.472.475-.472 1.143t.475 1.14q.476.472 1.143.472ZM12 19.678q2.82-2.454 4.458-4.991q1.638-2.538 1.638-4.39q0-2.744-1.737-4.53T12 3.981q-2.621 0-4.359 1.785t-1.737 4.53q0 1.852 1.638 4.39q1.639 2.537 4.458 4.99Zm0 1.342q-3.525-3.117-5.31-5.814q-1.786-2.697-1.786-4.909q0-3.173 2.066-5.234Q9.037 3 12 3t5.03 2.062q2.066 2.061 2.066 5.234q0 2.212-1.785 4.909q-1.786 2.697-5.311 5.814Zm0-10.904Z"
                    />
                  </svg>
                  <span>Av. Siempre Viva 742</span>
                  <span className="material-symbols-outlined text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m18.629 32.542l9.958 9.958l9.958-9.958"
                      />
                      <path
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M28.587 42.5V20.431c0-8.246-6.685-14.931-14.932-14.931h-4.2"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="material-symbols-outlined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        stroke="#000000"
                        d="M21 12a8.958 8.958 0 0 1-1.526 5.016A8.991 8.991 0 0 1 12 21a8.991 8.991 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"
                      />
                      <path
                        fill="#000000"
                        d="M13.5 9a1.5 1.5 0 0 1-1.5 1.5v1A2.5 2.5 0 0 0 14.5 9h-1ZM12 10.5A1.5 1.5 0 0 1 10.5 9h-1a2.5 2.5 0 0 0 2.5 2.5v-1ZM10.5 9A1.5 1.5 0 0 1 12 7.5v-1A2.5 2.5 0 0 0 9.5 9h1ZM12 7.5A1.5 1.5 0 0 1 13.5 9h1A2.5 2.5 0 0 0 12 6.5v1ZM5.166 17.856l-.48-.142l-.077.261l.177.207l.38-.326Zm13.668 0l.38.326l.177-.207l-.078-.261l-.479.142ZM9 15.5h6v-1H9v1Zm0-1a4.502 4.502 0 0 0-4.313 3.214l.958.285A3.502 3.502 0 0 1 9 15.5v-1Zm3 6a8.48 8.48 0 0 1-6.455-2.97l-.759.652A9.48 9.48 0 0 0 12 21.5v-1Zm3-5a3.502 3.502 0 0 1 3.355 2.5l.958-.286A4.502 4.502 0 0 0 15 14.5v1Zm3.455 2.03A8.48 8.48 0 0 1 12 20.5v1a9.48 9.48 0 0 0 7.214-3.318l-.76-.651Z"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </div>

            {/* Tiendas */}
            <div className="flex gap-2 overflow-x-auto pt-4 pb-2 -mx-4 px-4">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className={`flex shrink-0 items-center gap-3 rounded-lg p-3 border ${
                    store.highlighted
                      ? "bg-sky-50 border-sky-500"
                      : "bg-white border-transparent"
                  }`}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={store.img}
                    alt={store.name}
                  />
                  <div>
                    <p
                      className={`font-semibold ${
                        store.highlighted ? "text-sky-600 font-bold" : ""
                      }`}
                    >
                      {store.name}
                    </p>
                    <p className="text-xs text-gray-500">{store.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </header>

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
            <div
              className="mb-6 h-40 w-full rounded-xl bg-cover bg-center flex items-end p-4"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeRCOvz9iN-R9_5-c3uVxsoEQJYNlrZ-CJO89SR2gFzmgqbZYrt0TwqCHWeeYGKXoPur0u8Jhe7XYFp-7jLeH2U-CdtAWEqzRyYeziFjCIpD8Fz4gZfYiJEYSZ2mOj8F8CGOHxTX2xVUc9-G0GeIgt5EuNYWeDT29p3aw7bAEfYSHAq_OVjhpNknVanP2zMZnYzNHbGkt8MsFMVrrfCy7Dq_G3HccAiMhBxLfwDA0Q3vGnZh5ckHJ53jHn5RYJp4eulfto_2GB454")',
              }}
            >
              <div>
                <h2 className="text-2xl font-bold text-white">
                  20% en Lácteos
                </h2>
                <p className="text-sm text-white/90">¡Solo por esta semana!</p>
              </div>
            </div>

            {/* Categorías */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Categorías</h2>
              <button className="text-sm font-semibold text-sky-600">
                Ver todo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-sm w-full max-w-[5.5rem]">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium text-center">{cat.name}</p>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* FOOTER / NAV */}
        <footer className="sticky bottom-0 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="flex justify-around py-2">
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-sky-600">
              <span className="material-symbols-outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000000"
                    d="M20.506 10.896V20.5h-17v-9.642q-.633-.468-.926-1.225q-.293-.758-.013-1.618L3.938 3.5h16.097l1.41 4.515q.28.86-.013 1.631q-.294.771-.926 1.25Zm-6.3-.396q.963 0 1.438-.54t.4-1.114L15.38 4.5h-2.873v4.2q0 .737.504 1.268q.503.532 1.196.532Zm-4.5 0q.806 0 1.303-.532q.497-.531.497-1.268V4.5H8.633l-.666 4.423q-.061.465.407 1.021q.468.556 1.332.556Zm-4.45 0q.661 0 1.124-.45t.576-1.123L7.583 4.5H4.652L3.556 8.235q-.246.788.21 1.527q.457.738 1.49.738Zm13.5 0q.898 0 1.434-.7q.537-.7.266-1.565L19.329 4.5h-2.9l.627 4.427q.113.673.576 1.123q.462.45 1.124.45Zm-14.25 9h15v-8.127q-.202.07-.384.098q-.182.029-.366.029q-.675 0-1.188-.263q-.512-.264-.974-.84q-.392.488-.967.795q-.575.308-1.398.308q-.598 0-1.138-.279t-1.085-.825q-.502.546-1.113.825T9.73 11.5q-.629 0-1.226-.24t-1.047-.864q-.737.737-1.288.92q-.55.184-.912.184q-.185 0-.372-.029t-.378-.098V19.5Zm14.384 0H5.121h13.77Z"
                  />
                </svg>
              </span>
              <span className="text-xs font-medium">Inicio</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-500">
              <span className="material-symbols-outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m7.369 28.832l30.755-5.516l5.376-9.143l-8.245-5.958L4.5 13.73l2.869 15.102z"
                  />
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m10.494 28.272l7.997 11.513l23.522-15.73l1.487-9.882"
                  />
                  <circle cx="39.339" cy="14.912" r=".75" fill="#000000" />
                </svg>
              </span>
              <span className="text-xs font-medium">Ofertas</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-500">
              <span className="material-symbols-outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18.7 14.4h10.7v2.7H18.7zm0 6.1h10.7v2.7H18.7zm14.1-6.1h2.6v2.7h-2.6zm0 6.1h2.6v2.7h-2.6z"
                  />
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.6 5.3v27.5H6.5V39c0 1.8 2 4.5 4.1 4.5h26a5.19 5.19 0 0 0 4.9-4.9V5.3l-2.3 2.4l-3-3.2l-3.1 3.2l-3-3.2L27 7.7l-3-3.2l-3 3.2l-3.1-3.2l-3.1 3.2Z"
                  />
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.6 32.8h2.6V10.6h23.7v27.3c0 3.9-5.4 4.1-5.4 0v-5.1H12.6"
                  />
                </svg>
              </span>
              <span className="text-xs font-medium">Pedidos</span>
            </button>
            <Link
              to="/carrito"
              className="relative flex flex-col items-center gap-1 p-2 rounded-lg text-gray-500"
            >
              <span className="material-symbols-outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                  fill="#000000"
                >
                  <g
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M24 4.5a2.62 2.62 0 0 0-2.617 2.614H10.46c-.914 0-1.65.735-1.65 1.649v33.089c0 .913.736 1.648 1.65 1.648h27.078c.914 0 1.65-.735 1.65-1.648V8.762c0-.913-.736-1.648-1.65-1.648H26.617A2.62 2.62 0 0 0 24 4.5" />
                    <path d="M29.985 7.115v3.372h-11.97V7.115" />
                  </g>
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.209 15.166H30.79m-13.581 4.272H30.79m-17.472 4.445h1.044c.914 0 1.472.752 1.649 1.648l1.52 7.696c.32 1.622 1.24 2.346 2.8 2.346h7.778c1.561 0 2.48-.724 2.801-2.346l1.442-7.302l.035-.177H16.104m6.47 2.798h3.76m1.919 9.967a.766.766 0 1 1-1.532 0a.766.766 0 0 1 1.532 0m-6.473 0a.766.766 0 0 1-1.532 0h0c0-.423.343-.766.766-.766h0c.423 0 .767.343.767.766"
                  />
                </svg>
              </span>
              <span className="text-xs font-medium">Carrito</span>
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                3
              </span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Menu;
