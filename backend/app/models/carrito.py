from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from datetime import datetime
from app.database import Base

class Carrito(Base):
    __tablename__ = "carrito"

    carrito_id = Column(Integer, primary_key=True)
    session_id = Column(String(60), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.producto_id", ondelete="CASCADE"), nullable=False)
    cantidad = Column(Integer, nullable=False, default=1)
    fecha = Column(TIMESTAMP, default=datetime.utcnow)