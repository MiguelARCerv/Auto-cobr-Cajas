from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, condecimal
from datetime import datetime
from typing import List

router = APIRouter(prefix="/coupons", tags=["coupons"])


class CouponBase(BaseModel):
    tipo_cupon_id: int
    monto: condecimal(max_digits=10, decimal_places=2)
    fecha_inicio: datetime
    fecha_fin: datetime


class Coupon(CouponBase):
    id: int


_fake_coupons: dict[int, Coupon] = {}
_next_coupon_id = 1


@router.get("/", response_model=List[Coupon])
def list_coupons():
    return list(_fake_coupons.values())


@router.get("/{coupon_id}", response_model=Coupon)
def get_coupon(coupon_id: int):
    coupon = _fake_coupons.get(coupon_id)
    if not coupon:
        raise HTTPException(status_code=404, detail="Cupón no encontrado")
    return coupon


@router.post("/", response_model=Coupon, status_code=201)
def create_coupon(body: CouponBase):
    global _next_coupon_id
    coupon = Coupon(id=_next_coupon_id, **body.dict())
    _fake_coupons[_next_coupon_id] = coupon
    _next_coupon_id += 1
    return coupon


@router.put("/{coupon_id}", response_model=Coupon)
def update_coupon(coupon_id: int, body: CouponBase):
    if coupon_id not in _fake_coupons:
        raise HTTPException(status_code=404, detail="Cupón no encontrado")
    updated = Coupon(id=coupon_id, **body.dict())
    _fake_coupons[coupon_id] = updated
    return updated


@router.delete("/{coupon_id}", status_code=204)
def delete_coupon(coupon_id: int):
    if coupon_id not in _fake_coupons:
        raise HTTPException(status_code=404, detail="Cupón no encontrado")
    del _fake_coupons[coupon_id]