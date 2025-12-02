from pydantic import BaseModel

class FormaPagoBase(BaseModel):
    nombre: str

class FormaPagoCreate(FormaPagoBase):
    pass

class FormaPagoUpdate(BaseModel):
    nombre: str | None = None

class FormaPagoResponse(FormaPagoBase):
    forma_pago_id: int

    class Config:
        from_attributes = True