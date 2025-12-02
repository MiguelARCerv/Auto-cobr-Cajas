from pydantic import BaseModel
from datetime import datetime

class PedidoBase(BaseModel):
    subtotal: float
    descuento_total: float = 0
    impuesto_total: float = 0
    total_final: float
    estado: str

class PedidoCreate(PedidoBase):
    pass

class PedidoUpdate(BaseModel):
    subtotal: float | None = None
    descuento_total: float | None = None
    impuesto_total: float | None = None
    total_final: float | None = None
    estado: str | None = None

class PedidoResponse(PedidoBase):
    pedido_id: int
    fecha: datetime

    class Config:
        from_attributes = True