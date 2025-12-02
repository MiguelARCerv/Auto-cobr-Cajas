from sqlalchemy import Column, Integer, Numeric, String, TIMESTAMP
from app.database import Base
from datetime import datetime

class Pedido(Base):
    __tablename__ = "pedidos"

    pedido_id = Column(Integer, primary_key=True)
    fecha = Column(TIMESTAMP, default=datetime.utcnow)
    subtotal = Column(Numeric(10,2), nullable=False)
    descuento_total = Column(Numeric(10,2), default=0)
    impuesto_total = Column(Numeric(10,2), default=0)
    total_final = Column(Numeric(10,2), nullable=False)
    estado = Column(String(20), nullable=False)