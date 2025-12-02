from pydantic import BaseModel

class FacturacionBase(BaseModel):
    pedido_id: int
    rfc: str
    email: str
    razon_social: str | None = None

class FacturacionCreate(FacturacionBase):
    pass

class FacturacionUpdate(BaseModel):
    rfc: str | None = None
    email: str | None = None
    razon_social: str | None = None

class FacturacionResponse(FacturacionBase):
    facturacion_id: int

    class Config:
        from_attributes = True