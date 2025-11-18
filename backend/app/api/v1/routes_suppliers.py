from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List

router = APIRouter(prefix="/suppliers", tags=["suppliers"])


class SupplierBase(BaseModel):
    nombre: str
    director: str
    telefono: str
    correo: EmailStr


class Supplier(SupplierBase):
    id: int


_fake_suppliers: dict[int, Supplier] = {}
_next_supplier_id = 1


@router.get("/", response_model=List[Supplier])
def list_suppliers():
    return list(_fake_suppliers.values())


@router.get("/{supplier_id}", response_model=Supplier)
def get_supplier(supplier_id: int):
    supplier = _fake_suppliers.get(supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return supplier


@router.post("/", response_model=Supplier, status_code=201)
def create_supplier(body: SupplierBase):
    global _next_supplier_id
    supplier = Supplier(id=_next_supplier_id, **body.dict())
    _fake_suppliers[_next_supplier_id] = supplier
    _next_supplier_id += 1
    return supplier


@router.put("/{supplier_id}", response_model=Supplier)
def update_supplier(supplier_id: int, body: SupplierBase):
    if supplier_id not in _fake_suppliers:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    updated = Supplier(id=supplier_id, **body.dict())
    _fake_suppliers[supplier_id] = updated
    return updated


@router.delete("/{supplier_id}", status_code=204)
def delete_supplier(supplier_id: int):
    if supplier_id not in _fake_suppliers:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    del _fake_suppliers[supplier_id]