from pydantic import BaseModel

class InventarioBase(BaseModel):
    producto_id: int
    cantidad: int

class InventarioCreate(InventarioBase):
    pass

class InventarioUpdate(BaseModel):
    producto_id: int | None = None
    cantidad: int | None = None

class InventarioResponse(InventarioBase):
    inventario_id: int

    class Config:
        from_attributes = True