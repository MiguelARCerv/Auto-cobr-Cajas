from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.descuentos import Descuento as DescuentoModel
from app.schemas.descuentos import (
    DescuentoCreate,
    DescuentoUpdate,
    DescuentoResponse
)

router = APIRouter(prefix="/descuentos", tags=["Descuentos"])

# -------------------------------------------------------------------
# GET - listar todos
# -------------------------------------------------------------------
@router.get("/", response_model=list[DescuentoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(DescuentoModel).all()

# -------------------------------------------------------------------
# GET - obtener por id
# -------------------------------------------------------------------
@router.get("/{descuento_id}", response_model=DescuentoResponse)
def obtener(descuento_id: int, db: Session = Depends(get_db)):
    descuento = db.query(DescuentoModel).filter_by(descuento_id=descuento_id).first()

    if not descuento:
        raise HTTPException(status_code=404, detail="Descuento no encontrado")

    return descuento

# -------------------------------------------------------------------
# GET - listar por producto_id
# -------------------------------------------------------------------
@router.get("/producto/{producto_id}", response_model=list[DescuentoResponse])
def listar_por_producto(producto_id: int, db: Session = Depends(get_db)):
    return db.query(DescuentoModel).filter_by(producto_id=producto_id).all()

# -------------------------------------------------------------------
# POST - crear descuento
# -------------------------------------------------------------------
@router.post("/", response_model=DescuentoResponse)
def crear(data: DescuentoCreate, db: Session = Depends(get_db)):
    nuevo = DescuentoModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar descuento
# -------------------------------------------------------------------
@router.put("/{descuento_id}", response_model=DescuentoResponse)
def actualizar(descuento_id: int, data: DescuentoUpdate, db: Session = Depends(get_db)):
    descuento = db.query(DescuentoModel).filter_by(descuento_id=descuento_id).first()

    if not descuento:
        raise HTTPException(status_code=404, detail="Descuento no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(descuento, campo, valor)

    db.commit()
    db.refresh(descuento)
    return descuento

# -------------------------------------------------------------------
# DELETE - eliminar descuento
# -------------------------------------------------------------------
@router.delete("/{descuento_id}")
def eliminar(descuento_id: int, db: Session = Depends(get_db)):
    descuento = db.query(DescuentoModel).filter_by(descuento_id=descuento_id).first()

    if not descuento:
        raise HTTPException(status_code=404, detail="Descuento no encontrado")

    db.delete(descuento)
    db.commit()
    return {"message": "Descuento eliminado correctamente"}