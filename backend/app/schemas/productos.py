from pydantic import BaseModel
from datetime import date

class ProductoBase(BaseModel):
    categoria_id: int
    nombre: str
    cantidad: str
    codigo: str
    precio: float
    fecha_caducidad: date | None = None
    stock: int
    activo: bool = True

class ProductoCreate(ProductoBase):
    pass

class Producto(ProductoBase):
    producto_id: int
    class Config:
        orm_mode = True