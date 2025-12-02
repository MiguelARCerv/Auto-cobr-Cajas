from pydantic import BaseModel

class PedidoDetalleBase(BaseModel):
    pedido_id: int
    producto_id: int
    cantidad: int
    precio_unitario: float
    subtotal: float

class PedidoDetalleCreate(PedidoDetalleBase):
    pass

class PedidoDetalleUpdate(BaseModel):
    pedido_id: int | None = None
    producto_id: int | None = None
    cantidad: int | None = None
    precio_unitario: float | None = None
    subtotal: float | None = None

class PedidoDetalleResponse(PedidoDetalleBase):
    detalle_id: int

    class Config:
        from_attributes = True