from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.pedidos import Pedido as PedidoModel
from app.schemas.pedidos import PedidoCreate, PedidoUpdate, PedidoResponse

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])

# -------------------------------------------------------------------
# GET - listar todos los pedidos
# -------------------------------------------------------------------
@router.get("/", response_model=list[PedidoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(PedidoModel).all()

# -------------------------------------------------------------------
# GET - obtener un pedido por id
# -------------------------------------------------------------------
@router.get("/{pedido_id}", response_model=PedidoResponse)
def obtener(pedido_id: int, db: Session = Depends(get_db)):
    pedido = db.query(PedidoModel).filter_by(pedido_id=pedido_id).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return pedido

# -------------------------------------------------------------------
# POST - crear pedido
# -------------------------------------------------------------------
@router.post("/", response_model=PedidoResponse)
def crear(data: PedidoCreate, db: Session = Depends(get_db)):
    nuevo = PedidoModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar pedido
# -------------------------------------------------------------------
@router.put("/{pedido_id}", response_model=PedidoResponse)
def actualizar(pedido_id: int, data: PedidoUpdate, db: Session = Depends(get_db)):
    pedido = db.query(PedidoModel).filter_by(pedido_id=pedido_id).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(pedido, campo, valor)

    db.commit()
    db.refresh(pedido)
    return pedido

# -------------------------------------------------------------------
# DELETE - eliminar pedido
# -------------------------------------------------------------------
@router.delete("/{pedido_id}")
def eliminar(pedido_id: int, db: Session = Depends(get_db)):
    pedido = db.query(PedidoModel).filter_by(pedido_id=pedido_id).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    db.delete(pedido)
    db.commit()

    return {"message": "Pedido eliminado correctamente"}