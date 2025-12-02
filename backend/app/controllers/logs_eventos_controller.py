from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.logs_eventos import LogEvento as LogEventoModel
from app.schemas.logs_eventos import (
    LogEventoCreate,
    LogEventoUpdate,
    LogEventoResponse
)

router = APIRouter(prefix="/logs-eventos", tags=["Logs de Eventos"])

# -------------------------------------------------------------------
# GET - listar todos
# -------------------------------------------------------------------
@router.get("/", response_model=list[LogEventoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(LogEventoModel).all()

# -------------------------------------------------------------------
# GET - obtener por id
# -------------------------------------------------------------------
@router.get("/{log_id}", response_model=LogEventoResponse)
def obtener(log_id: int, db: Session = Depends(get_db)):
    log = db.query(LogEventoModel).filter_by(log_id=log_id).first()

    if not log:
        raise HTTPException(status_code=404, detail="Log no encontrado")

    return log

# -------------------------------------------------------------------
# POST - crear log
# -------------------------------------------------------------------
@router.post("/", response_model=LogEventoResponse)
def crear(data: LogEventoCreate, db: Session = Depends(get_db)):
    nuevo = LogEventoModel(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# -------------------------------------------------------------------
# PUT - actualizar log
# -------------------------------------------------------------------
@router.put("/{log_id}", response_model=LogEventoResponse)
def actualizar(log_id: int, data: LogEventoUpdate, db: Session = Depends(get_db)):
    log = db.query(LogEventoModel).filter_by(log_id=log_id).first()

    if not log:
        raise HTTPException(status_code=404, detail="Log no encontrado")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(log, campo, valor)

    db.commit()
    db.refresh(log)
    return log

# -------------------------------------------------------------------
# DELETE - eliminar log
# -------------------------------------------------------------------
@router.delete("/{log_id}")
def eliminar(log_id: int, db: Session = Depends(get_db)):
    log = db.query(LogEventoModel).filter_by(log_id=log_id).first()

    if not log:
        raise HTTPException(status_code=404, detail="Log no encontrado")

    db.delete(log)
    db.commit()
    return {"message": "Log eliminado correctamente"}