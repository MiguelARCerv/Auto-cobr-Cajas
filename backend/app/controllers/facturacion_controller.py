from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.facturacion import Facturacion as FacturacionModel
from app.schemas.facturacion import (
    FacturacionCreate,
    FacturacionUpdate,
    FacturacionResponse
)

router = APIRouter(prefix="/facturacion", tags=["Facturación"])

# -------------------------------------------------------------------
# GET - listar todos
# -------------------------------------------------------------------
@router.get("/", response_model=list[FacturacionResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(FacturacionModel).all()

# -------------------------------------------------------------------
# GET - obtener por id
# -------------------------------------------------------------------
@router.get("/{facturacion_id}", response_model=FacturacionResponse)
def obtener(facturacion_id: int, db: Session = Depends(get_db)):
    factura = db.query(FacturacionModel).filter_by(facturacion_id=facturacion_id).first()

    if not factura:
        raise HTTPException(status_code=404, detail="Registro de facturación no encontrado")

    return factura

# -------------------------------------------------------------------
# GET - obtener por pedido
# -------------------------------------------------------------------
@router.get("/pedido/{pedido_id}", response_model=list[FacturacionResponse])
def listar_por_pedido(pedido_id: int, db: Session = Depends(get_db)):
    return db.query(FacturacionModel).filter_by(pedido_id=pedido_id).all()

# -------------------------------------------------------------------
# POST - crear registro
# -------------------------------------------------------------------
@router.post("/", response_model=FacturacionResponse)
def crear(data: FacturacionCreate, db: Session = Depends(get_db)):
    nuevo = FacturacionModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar registro
# -------------------------------------------------------------------
@router.put("/{facturacion_id}", response_model=FacturacionResponse)
def actualizar(facturacion_id: int, data: FacturacionUpdate, db: Session = Depends(get_db)):
    factura = db.query(FacturacionModel).filter_by(facturacion_id=facturacion_id).first()

    if not factura:
        raise HTTPException(status_code=404, detail="Registro de facturación no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(factura, campo, valor)

    db.commit()
    db.refresh(factura)
    return factura

# -------------------------------------------------------------------
# DELETE - eliminar
# -------------------------------------------------------------------
@router.delete("/{facturacion_id}")
def eliminar(facturacion_id: int, db: Session = Depends(get_db)):
    factura = db.query(FacturacionModel).filter_by(facturacion_id=facturacion_id).first()

    if not factura:
        raise HTTPException(status_code=404, detail="Registro de facturación no encontrado")

    db.delete(factura)
    db.commit()
    return {"message": "Registro de facturación eliminado correctamente"}