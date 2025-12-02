import { Link } from "react-router-dom";

export default function FooterNav() {
  return (
    <footer className="sticky bottom-0 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="flex justify-around py-2">
        {/* Inicio */}
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

        {/* Ofertas */}
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
        {/* ESCANEAR (Botón circular) */}
        <Link
          to="/escaneo"
          className="flex flex-col items-center gap-1 p-2 text-white"
        >
          <div className="flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-emerald-500 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2M3 17v2a2 2 0 0 0 2 2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 12h10M12 7v10" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">Escanear</span>
        </Link>

        {/* Pedidos */}
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

        {/* Carrito */}
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
  );
}
