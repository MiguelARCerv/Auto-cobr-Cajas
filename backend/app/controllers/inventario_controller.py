from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db

from app.models.inventario import Inventario as InventarioModel
from app.schemas.inventario import (
    InventarioCreate, InventarioUpdate, InventarioResponse
)

router = APIRouter(prefix="/inventario", tags=["Inventario"])

# GET - listar todo
@router.get("/", response_model=list[InventarioResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(InventarioModel).all()

# GET - por producto
@router.get("/producto/{producto_id}", response_model=InventarioResponse)
def obtener_por_producto(producto_id: int, db: Session = Depends(get_db)):
    inv = db.query(InventarioModel).filter_by(producto_id=producto_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Producto sin inventario registrado")
    return inv

# POST - crear registro
@router.post("/", response_model=InventarioResponse)
def crear(data: InventarioCreate, db: Session = Depends(get_db)):
    nuevo = InventarioModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# PUT - actualizar inventario
@router.put("/{inventario_id}", response_model=InventarioResponse)
def actualizar(inventario_id: int, data: InventarioUpdate, db: Session = Depends(get_db)):
    inv = db.query(InventarioModel).filter_by(inventario_id=inventario_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Inventario no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(inv, campo, valor)

    db.commit()
    db.refresh(inv)
    return inv

# DELETE
@router.delete("/{inventario_id}")
def eliminar(inventario_id: int, db: Session = Depends(get_db)):
    inv = db.query(InventarioModel).filter_by(inventario_id=inventario_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Inventario no encontrado")

    db.delete(inv)
    db.commit()
    return {"message": "Inventario eliminado correctamente"}