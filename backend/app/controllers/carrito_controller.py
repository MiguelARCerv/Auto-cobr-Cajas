from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.carrito import Carrito as CarritoModel
from app.schemas.carrito import CarritoCreate, CarritoUpdate, CarritoResponse

router = APIRouter(prefix="/carrito", tags=["Carrito"])

# -------------------------------------------------------------------
# GET - listar todo el carrito
# -------------------------------------------------------------------
@router.get("/", response_model=list[CarritoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(CarritoModel).all()

# -------------------------------------------------------------------
# GET - obtener por id
# -------------------------------------------------------------------
@router.get("/{carrito_id}", response_model=CarritoResponse)
def obtener(carrito_id: int, db: Session = Depends(get_db)):
    item = db.query(CarritoModel).filter_by(carrito_id=carrito_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item no encontrado en carrito")

    return item

# -------------------------------------------------------------------
# GET - listar por session_id
# -------------------------------------------------------------------
@router.get("/session/{session_id}", response_model=list[CarritoResponse])
def listar_por_session(session_id: str, db: Session = Depends(get_db)):
    return db.query(CarritoModel).filter_by(session_id=session_id).all()

# -------------------------------------------------------------------
# POST - agregar al carrito
# -------------------------------------------------------------------
@router.post("/", response_model=CarritoResponse)
def agregar(data: CarritoCreate, db: Session = Depends(get_db)):
    nuevo = CarritoModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar item del carrito
# -------------------------------------------------------------------
@router.put("/{carrito_id}", response_model=CarritoResponse)
def actualizar(carrito_id: int, data: CarritoUpdate, db: Session = Depends(get_db)):
    item = db.query(CarritoModel).filter_by(carrito_id=carrito_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item no encontrado en carrito")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(item, campo, valor)

    db.commit()
    db.refresh(item)
    return item

# -------------------------------------------------------------------
# DELETE - eliminar item
# -------------------------------------------------------------------
@router.delete("/{carrito_id}")
def eliminar(carrito_id: int, db: Session = Depends(get_db)):
    item = db.query(CarritoModel).filter_by(carrito_id=carrito_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item no encontrado en carrito")

    db.delete(item)
    db.commit()
    return {"message": "Item eliminado del carrito correctamente"}