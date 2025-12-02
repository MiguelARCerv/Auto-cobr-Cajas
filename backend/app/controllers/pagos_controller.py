from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.pagos import Pago as PagoModel
from app.schemas.pagos import PagoCreate, PagoUpdate, PagoResponse

router = APIRouter(prefix="/pagos", tags=["Pagos"])

# -------------------------------------------------------------------
# GET - listar todos los pagos
# -------------------------------------------------------------------
@router.get("/", response_model=list[PagoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(PagoModel).all()

# -------------------------------------------------------------------
# GET - obtener un pago por id
# -------------------------------------------------------------------
@router.get("/{pago_id}", response_model=PagoResponse)
def obtener(pago_id: int, db: Session = Depends(get_db)):
    pago = db.query(PagoModel).filter_by(pago_id=pago_id).first()

    if not pago:
        raise HTTPException(status_code=404, detail="Pago no encontrado")

    return pago

# -------------------------------------------------------------------
# POST - crear pago
# -------------------------------------------------------------------
@router.post("/", response_model=PagoResponse)
def crear(data: PagoCreate, db: Session = Depends(get_db)):
    nuevo = PagoModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar pago
# -------------------------------------------------------------------
@router.put("/{pago_id}", response_model=PagoResponse)
def actualizar(pago_id: int, data: PagoUpdate, db: Session = Depends(get_db)):
    pago = db.query(PagoModel).filter_by(pago_id=pago_id).first()

    if not pago:
        raise HTTPException(status_code=404, detail="Pago no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(pago, campo, valor)

    db.commit()
    db.refresh(pago)
    return pago

# -------------------------------------------------------------------
# DELETE - eliminar pago
# -------------------------------------------------------------------
@router.delete("/{pago_id}")
def eliminar(pago_id: int, db: Session = Depends(get_db)):
    pago = db.query(PagoModel).filter_by(pago_id=pago_id).first()

    if not pago:
        raise HTTPException(status_code=404, detail="Pago no encontrado")

    db.delete(pago)
    db.commit()

    return {"message": "Pago eliminado correctamente"}