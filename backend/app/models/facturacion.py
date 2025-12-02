from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Facturacion(Base):
    __tablename__ = "facturacion"

    facturacion_id = Column(Integer, primary_key=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.pedido_id", ondelete="CASCADE"), nullable=False)
    rfc = Column(String(13), nullable=False)
    email = Column(String(80), nullable=False)
    razon_social = Column(String(120))