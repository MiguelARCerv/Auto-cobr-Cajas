from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, condecimal
from datetime import datetime
from typing import List, Literal

router = APIRouter(prefix="/discounts", tags=["discounts"])


class DiscountBase(BaseModel):
    tipo_descuento_id: int
    monto: condecimal(max_digits=10, decimal_places=2)
    fecha_inicio: datetime
    fecha_fin: datetime


class Discount(DiscountBase):
    id: int


_fake_discounts: dict[int, Discount] = {}
_next_discount_id = 1


@router.get("/", response_model=List[Discount])
def list_discounts():
    return list(_fake_discounts.values())


@router.get("/{discount_id}", response_model=Discount)
def get_discount(discount_id: int):
    discount = _fake_discounts.get(discount_id)
    if not discount:
        raise HTTPException(status_code=404, detail="Descuento no encontrado")
    return discount


@router.post("/", response_model=Discount, status_code=201)
def create_discount(body: DiscountBase):
    global _next_discount_id
    discount = Discount(id=_next_discount_id, **body.dict())
    _fake_discounts[_next_discount_id] = discount
    _next_discount_id += 1
    return discount


@router.put("/{discount_id}", response_model=Discount)
def update_discount(discount_id: int, body: DiscountBase):
    if discount_id not in _fake_discounts:
        raise HTTPException(status_code=404, detail="Descuento no encontrado")
    updated = Discount(id=discount_id, **body.dict())
    _fake_discounts[discount_id] = updated
    return updated


@router.delete("/{discount_id}", status_code=204)
def delete_discount(discount_id: int):
    if discount_id not in _fake_discounts:
        raise HTTPException(status_code=404, detail="Descuento no encontrado")
    del _fake_discounts[discount_id]