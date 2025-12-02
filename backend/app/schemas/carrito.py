from pydantic import BaseModel
from datetime import datetime

class CarritoBase(BaseModel):
    session_id: str
    producto_id: int
    cantidad: int = 1

class CarritoCreate(CarritoBase):
    pass

class CarritoUpdate(BaseModel):
    session_id: str | None = None
    producto_id: int | None = None
    cantidad: int | None = None

class CarritoResponse(CarritoBase):
    carrito_id: int
    fecha: datetime

    class Config:
        from_attributes = True