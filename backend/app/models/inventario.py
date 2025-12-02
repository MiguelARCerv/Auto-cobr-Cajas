from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class Inventario(Base):
    __tablename__ = "inventario"

    inventario_id = Column(Integer, primary_key=True)
    producto_id = Column(Integer, ForeignKey("productos.producto_id", ondelete="CASCADE"), nullable=False)
    cantidad = Column(Integer, nullable=False)