from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/categories", tags=["categories"])


class CategoryBase(BaseModel):
    nombre: str
    descripcion: str


class Category(CategoryBase):
    id: int


# Fake DB en memoria
_fake_categories: dict[int, Category] = {}
_next_category_id = 1


@router.get("/", response_model=List[Category])
def list_categories():
    return list(_fake_categories.values())


@router.get("/{category_id}", response_model=Category)
def get_category(category_id: int):
    category = _fake_categories.get(category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return category


@router.post("/", response_model=Category, status_code=201)
def create_category(body: CategoryBase):
    global _next_category_id
    category = Category(id=_next_category_id, **body.dict())
    _fake_categories[_next_category_id] = category
    _next_category_id += 1
    return category


@router.put("/{category_id}", response_model=Category)
def update_category(category_id: int, body: CategoryBase):
    if category_id not in _fake_categories:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    updated = Category(id=category_id, **body.dict())
    _fake_categories[category_id] = updated
    return updated


@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int):
    if category_id not in _fake_categories:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    del _fake_categories[category_id]