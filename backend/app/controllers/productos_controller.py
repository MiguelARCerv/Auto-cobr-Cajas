from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.productos import Producto
from app.schemas.productos import ProductoCreate, Producto as ProductoResponse

router = APIRouter(prefix="/productos", tags=["Productos"])

# ------------------------------------------------------------
# GET - listar todos los productos
# ------------------------------------------------------------
@router.get("/", response_model=list[ProductoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(Producto).all()


# ------------------------------------------------------------
# POST - crear producto
# ------------------------------------------------------------
@router.post("/", response_model=ProductoResponse)
def crear(data: ProductoCreate, db: Session = Depends(get_db)):
    nuevo = Producto(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


# ------------------------------------------------------------
# PUT - actualizar producto por ID
# ------------------------------------------------------------
@router.put("/{producto_id}", response_model=ProductoResponse)
def actualizar(producto_id: int, data: ProductoCreate, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter_by(producto_id=producto_id).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    for campo, valor in data.model_dump().items():
        setattr(producto, campo, valor)

    db.commit()
    db.refresh(producto)
    return producto


# ------------------------------------------------------------
# DELETE - eliminar producto
# ------------------------------------------------------------
@router.delete("/{producto_id}")
def eliminar(producto_id: int, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter_by(producto_id=producto_id).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    db.delete(producto)
    db.commit()

    return {"message": "Producto eliminado correctamente"}

@router.get("/categoria/{categoria_id}", response_model=list[ProductoResponse])
def obtener_por_categoria(categoria_id: int, db: Session = Depends(get_db)):
    productos = db.query(Producto).filter(Producto.categoria_id == categoria_id).all()
    return productos

@router.get("/codigo/{codigo}", response_model=ProductoResponse)
def obtener_por_codigo(codigo: str, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter(Producto.codigo == codigo).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return producto

@router.get("/{producto_id}", response_model=ProductoResponse)
def obtener_uno(producto_id: int, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter_by(producto_id=producto_id).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return producto