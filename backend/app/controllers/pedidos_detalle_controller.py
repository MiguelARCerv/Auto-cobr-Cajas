from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.pedido_detalles import PedidoDetalle as PedidoDetalleModel
from app.schemas.pedido_detalles import (
    PedidoDetalleCreate,
    PedidoDetalleUpdate,
    PedidoDetalleResponse
)

router = APIRouter(prefix="/pedido-detalle", tags=["Pedido Detalle"])

# -------------------------------------------------------------------
# GET - listar todos los detalles
# -------------------------------------------------------------------
@router.get("/", response_model=list[PedidoDetalleResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(PedidoDetalleModel).all()

# -------------------------------------------------------------------
# GET - obtener detalle por id
# -------------------------------------------------------------------
@router.get("/{detalle_id}", response_model=PedidoDetalleResponse)
def obtener(detalle_id: int, db: Session = Depends(get_db)):
    detalle = db.query(PedidoDetalleModel).filter_by(detalle_id=detalle_id).first()

    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")

    return detalle

# -------------------------------------------------------------------
# POST - crear detalle
# -------------------------------------------------------------------
@router.post("/", response_model=PedidoDetalleResponse)
def crear(data: PedidoDetalleCreate, db: Session = Depends(get_db)):
    nuevo = PedidoDetalleModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar detalle
# -------------------------------------------------------------------
@router.put("/{detalle_id}", response_model=PedidoDetalleResponse)
def actualizar(detalle_id: int, data: PedidoDetalleUpdate, db: Session = Depends(get_db)):
    detalle = db.query(PedidoDetalleModel).filter_by(detalle_id=detalle_id).first()

    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(detalle, campo, valor)

    db.commit()
    db.refresh(detalle)
    return detalle

# -------------------------------------------------------------------
# DELETE - eliminar detalle
# -------------------------------------------------------------------
@router.delete("/{detalle_id}")
def eliminar(detalle_id: int, db: Session = Depends(get_db)):
    detalle = db.query(PedidoDetalleModel).filter_by(detalle_id=detalle_id).first()

    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")

    db.delete(detalle)
    db.commit()
    return {"message": "Detalle eliminado correctamente"}