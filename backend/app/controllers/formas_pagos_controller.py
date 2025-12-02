from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.formas_pago import FormaPago as FormaPagoModel
from app.schemas.formas_pago import (
    FormaPagoCreate,
    FormaPagoUpdate,
    FormaPagoResponse
)

router = APIRouter(prefix="/formas-pago", tags=["Formas de Pago"])

# -------------------------------------------------------------------
# GET - listar todas
# -------------------------------------------------------------------
@router.get("/", response_model=list[FormaPagoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(FormaPagoModel).all()

# -------------------------------------------------------------------
# GET - obtener una por id
# -------------------------------------------------------------------
@router.get("/{forma_pago_id}", response_model=FormaPagoResponse)
def obtener(forma_pago_id: int, db: Session = Depends(get_db)):
    forma = db.query(FormaPagoModel).filter_by(forma_pago_id=forma_pago_id).first()

    if not forma:
        raise HTTPException(status_code=404, detail="Forma de pago no encontrada")

    return forma

# -------------------------------------------------------------------
# POST - crear nueva
# -------------------------------------------------------------------
@router.post("/", response_model=FormaPagoResponse)
def crear(data: FormaPagoCreate, db: Session = Depends(get_db)):
    nueva = FormaPagoModel(**data.model_dump())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

# -------------------------------------------------------------------
# PUT - actualizar
# -------------------------------------------------------------------
@router.put("/{forma_pago_id}", response_model=FormaPagoResponse)
def actualizar(forma_pago_id: int, data: FormaPagoUpdate, db: Session = Depends(get_db)):
    forma = db.query(FormaPagoModel).filter_by(forma_pago_id=forma_pago_id).first()

    if not forma:
        raise HTTPException(status_code=404, detail="Forma de pago no encontrada")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(forma, campo, valor)

    db.commit()
    db.refresh(forma)
    return forma

# -------------------------------------------------------------------
# DELETE - eliminar
# -------------------------------------------------------------------
@router.delete("/{forma_pago_id}")
def eliminar(forma_pago_id: int, db: Session = Depends(get_db)):
    forma = db.query(FormaPagoModel).filter_by(forma_pago_id=forma_pago_id).first()

    if not forma:
        raise HTTPException(status_code=404, detail="Forma de pago no encontrada")

    db.delete(forma)
    db.commit()
    return {"message": "Forma de pago eliminada correctamente"}