from sqlalchemy import Column, Integer, String, Numeric, Boolean, Date, ForeignKey
from app.database import Base

class Producto(Base):
    __tablename__ = "productos"

    producto_id = Column(Integer, primary_key=True)
    categoria_id = Column(Integer, ForeignKey("categorias.categoria_id", ondelete="CASCADE"), nullable=False)
    nombre = Column(String(50), nullable=False)
    cantidad = Column(String(15), nullable=False)
    codigo = Column(String(20), nullable=False)
    precio = Column(Numeric(10,2), nullable=False)
    fecha_caducidad = Column(Date)
    stock = Column(Integer, nullable=False)
    activo = Column(Boolean, nullable=False, default=True)