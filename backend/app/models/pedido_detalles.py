from sqlalchemy import Column, Integer, ForeignKey, Numeric
from app.database import Base

class PedidoDetalle(Base):
    __tablename__ = "pedido_detalle"

    detalle_id = Column(Integer, primary_key=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.pedido_id", ondelete="CASCADE"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.producto_id", ondelete="CASCADE"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(Numeric(10,2), nullable=False)
    subtotal = Column(Numeric(10,2), nullable=False)