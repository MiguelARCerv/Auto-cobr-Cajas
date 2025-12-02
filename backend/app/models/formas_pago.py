from sqlalchemy import Column, Integer, String
from app.database import Base

class FormaPago(Base):
    __tablename__ = "formas_pago"

    forma_pago_id = Column(Integer, primary_key=True)
    nombre = Column(String(40), nullable=False)