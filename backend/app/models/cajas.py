from sqlalchemy import Column, Integer, String
from app.database import Base

class Caja(Base):
    __tablename__ = "cajas_autopago"

    caja_id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)
    ubicacion = Column(String(100))
    estado = Column(String(20), default="ACTIVA")