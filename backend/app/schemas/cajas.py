from pydantic import BaseModel

class CajaBase(BaseModel):
    nombre: str
    ubicacion: str | None = None
    estado: str = "ACTIVA"

class CajaCreate(CajaBase):
    pass

class CajaUpdate(BaseModel):
    nombre: str | None = None
    ubicacion: str | None = None
    estado: str | None = None

class CajaResponse(CajaBase):
    caja_id: int

    class Config:
        from_attributes = True