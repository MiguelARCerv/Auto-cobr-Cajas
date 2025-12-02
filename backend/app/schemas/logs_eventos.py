from pydantic import BaseModel
from datetime import datetime

class LogEventoBase(BaseModel):
    tipo: str
    mensaje: str
    pedido_id: int | None = None

class LogEventoCreate(LogEventoBase):
    pass

class LogEventoUpdate(BaseModel):
    tipo: str | None = None
    mensaje: str | None = None
    pedido_id: int | None = None

class LogEventoResponse(LogEventoBase):
    log_id: int
    fecha: datetime

    class Config:
        from_attributes = True