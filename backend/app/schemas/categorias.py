from pydantic import BaseModel

class CategoriaBase(BaseModel):
    nombre: str
    descripcion: str | None = None

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None

class CategoriaResponse(CategoriaBase):
    categoria_id: int

    class Config:
        from_attributes = True