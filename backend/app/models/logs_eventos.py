from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from datetime import datetime
from app.database import Base

class LogEvento(Base):
    __tablename__ = "logs_eventos"

    log_id = Column(Integer, primary_key=True)
    tipo = Column(String(50), nullable=False)
    mensaje = Column(Text, nullable=False)
    pedido_id = Column(Integer, ForeignKey("pedidos.pedido_id", ondelete="CASCADE"))
    fecha = Column(TIMESTAMP, default=datetime.utcnow)