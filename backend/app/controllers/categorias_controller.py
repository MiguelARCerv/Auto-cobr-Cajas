from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.categorias import Categoria as CategoriaModel
from app.schemas.categorias import CategoriaCreate, CategoriaUpdate, CategoriaResponse

router = APIRouter(prefix="/categorias", tags=["Categorias"])

# -------------------------------------------------------------------
# GET - listar todas
# -------------------------------------------------------------------
@router.get("/", response_model=list[CategoriaResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(CategoriaModel).all()

# -------------------------------------------------------------------
# POST - crear categoría
# -------------------------------------------------------------------
@router.post("/", response_model=CategoriaResponse)
def crear(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    nueva = CategoriaModel(**categoria.model_dump())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

# -------------------------------------------------------------------
# GET - obtener una categoría por id
# -------------------------------------------------------------------
@router.get("/{categoria_id}", response_model=CategoriaResponse)
def obtener(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.query(CategoriaModel).filter_by(categoria_id=categoria_id).first()

    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    return categoria

# -------------------------------------------------------------------
# PUT - actualizar categoría por id
# -------------------------------------------------------------------
@router.put("/{categoria_id}", response_model=CategoriaResponse)
def actualizar(categoria_id: int, data: CategoriaUpdate, db: Session = Depends(get_db)):
    categoria = db.query(CategoriaModel).filter_by(categoria_id=categoria_id).first()

    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    for campo, valor in data.model_dump(exclude_unset=True).items():
        setattr(categoria, campo, valor)

    db.commit()
    db.refresh(categoria)
    return categoria

# -------------------------------------------------------------------
# DELETE - eliminar categoría por id
# -------------------------------------------------------------------
@router.delete("/{categoria_id}")
def eliminar(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.query(CategoriaModel).filter_by(categoria_id=categoria_id).first()

    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    db.delete(categoria)
    db.commit()
    return {"message": "Categoría eliminada correctamente"}