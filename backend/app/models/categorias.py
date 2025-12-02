from sqlalchemy import Column, Integer, String
from app.database import Base

class Categoria(Base):
    __tablename__ = "categorias"

    categoria_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(70), nullable=False)
    descripcion = Column(String(100))