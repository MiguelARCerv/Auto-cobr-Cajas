from fastapi import FastAPI

from app.controllers.categorias_controller import router as categorias_router
from app.controllers.productos_controller import router as productos_router
from app.controllers.pedidos_controller import router as pedidos_router
from app.controllers.pagos_controller import router as pagos_router
from app.controllers.cajas_controller import router as cajas_router
from app.controllers.carrito_controller import router as carrito_router
from app.controllers.descuentos_controller import router as descuentos_router
from app.controllers.facturacion_controller import router as facturacion_router
from app.controllers.formas_pagos_controller import router as formas_pago_router
from app.controllers.logs_eventos_controller import router as logs_eventos_router
from app.controllers.pedidos_detalle_controller import router as pedido_detalle_router
from app.controllers.inventario_controller import router as inventario_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cajas Autopago")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tu frontend
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routers
app.include_router(categorias_router)
app.include_router(productos_router)
app.include_router(pedidos_router)
app.include_router(pagos_router)
app.include_router(cajas_router)
app.include_router(carrito_router)
app.include_router(descuentos_router)
app.include_router(facturacion_router)
app.include_router(formas_pago_router)
app.include_router(logs_eventos_router)
app.include_router(pedido_detalle_router)
app.include_router(inventario_router)

@app.get("/")
def root():
    return {"msg": "API funcionando"}