from pydantic import BaseModel
from datetime import datetime

class PagoBase(BaseModel):
    pedido_id: int
    forma_pago_id: int
    monto: float
    recibido: float | None = None
    cambio: float | None = None
    referencia: str | None = None

class PagoCreate(PagoBase):
    pass

class PagoUpdate(BaseModel):
    pedido_id: int | None = None
    forma_pago_id: int | None = None
    monto: float | None = None
    recibido: float | None = None
    cambio: float | None = None
    referencia: str | None = None

class PagoResponse(PagoBase):
    pago_id: int
    fecha: datetime

    class Config:
        from_attributes = True