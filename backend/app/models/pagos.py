from sqlalchemy import Column, Integer, Numeric, String, TIMESTAMP, ForeignKey
from datetime import datetime
from app.database import Base

class Pago(Base):
    __tablename__ = "pagos"

    pago_id = Column(Integer, primary_key=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.pedido_id", ondelete="CASCADE"), nullable=False)
    forma_pago_id = Column(Integer, ForeignKey("formas_pago.forma_pago_id", ondelete="CASCADE"), nullable=False)
    monto = Column(Numeric(10,2), nullable=False)
    recibido = Column(Numeric(10,2))
    cambio = Column(Numeric(10,2))
    referencia = Column(String(80))
    fecha = Column(TIMESTAMP, default=datetime.utcnow)