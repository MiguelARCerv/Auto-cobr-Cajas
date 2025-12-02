from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.cajas import Caja as CajaModel
from app.schemas.cajas import CajaCreate, CajaUpdate, CajaResponse

router = APIRouter(prefix="/cajas", tags=["Cajas Autopago"])

# -------------------------------------------------------------------
# GET - listar todas las cajas
# -------------------------------------------------------------------
@router.get("/", response_model=list[CajaResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(CajaModel).all()

# -------------------------------------------------------------------
# GET - obtener una caja por id
# -------------------------------------------------------------------
@router.get("/{caja_id}", response_model=CajaResponse)
def obtener(caja_id: int, db: Session = Depends(get_db)):
    caja = db.query(CajaModel).filter_by(caja_id=caja_id).first()

    if not caja:
        raise HTTPException(status_code=404, detail="Caja no encontrada")

    return caja

# -------------------------------------------------------------------
# POST - crear caja
# -------------------------------------------------------------------
@router.post("/", response_model=CajaResponse)
def crear(data: CajaCreate, db: Session = Depends(get_db)):
    nueva = CajaModel(**data.model_dump())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

# -------------------------------------------------------------------
# PUT - actualizar caja
# -------------------------------------------------------------------
@router.put("/{caja_id}", response_model=CajaResponse)
def actualizar(caja_id: int, data: CajaUpdate, db: Session = Depends(get_db)):
    caja = db.query(CajaModel).filter_by(caja_id=caja_id).first()

    if not caja:
        raise HTTPException(status_code=404, detail="Caja no encontrada")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(caja, campo, valor)

    db.commit()
    db.refresh(caja)
    return caja

# -------------------------------------------------------------------
# DELETE - eliminar caja
# -------------------------------------------------------------------
@router.delete("/{caja_id}")
def eliminar(caja_id: int, db: Session = Depends(get_db)):
    caja = db.query(CajaModel).filter_by(caja_id=caja_id).first()

    if not caja:
        raise HTTPException(status_code=404, detail="Caja no encontrada")

    db.delete(caja)
    db.commit()

    return {"message": "Caja eliminada correctamente"}