from pydantic import BaseModel
from datetime import datetime

class DescuentoBase(BaseModel):
    producto_id: int
    tipo: str          # PORCENTAJE o MONTO
    valor: float
    fecha_inicio: datetime
    fecha_fin: datetime

class DescuentoCreate(DescuentoBase):
    pass

class DescuentoUpdate(BaseModel):
    tipo: str | None = None
    valor: float | None = None
    fecha_inicio: datetime | None = None
    fecha_fin: datetime | None = None

class DescuentoResponse(DescuentoBase):
    descuento_id: int

    class Config:
        from_attributes = True