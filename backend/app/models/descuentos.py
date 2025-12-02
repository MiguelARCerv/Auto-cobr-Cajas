from sqlalchemy import Column, Integer, String, Numeric, TIMESTAMP, ForeignKey
from app.database import Base

class Descuento(Base):
    __tablename__ = "descuentos"

    descuento_id = Column(Integer, primary_key=True)
    producto_id = Column(Integer, ForeignKey("productos.producto_id", ondelete="CASCADE"), nullable=False)
    tipo = Column(String(20), nullable=False)     # PORCENTAJE o MONTO
    valor = Column(Numeric(10,2), nullable=False)
    fecha_inicio = Column(TIMESTAMP, nullable=False)
    fecha_fin = Column(TIMESTAMP, nullable=False)