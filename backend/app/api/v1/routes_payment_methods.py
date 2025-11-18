from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/payment-methods", tags=["payment-methods"])


class PaymentMethodBase(BaseModel):
    nombre: str
    activo: bool = True


class PaymentMethod(PaymentMethodBase):
    id: int


_fake_payment_methods: dict[int, PaymentMethod] = {}
_next_payment_method_id = 1


@router.get("/", response_model=List[PaymentMethod])
def list_payment_methods():
    return list(_fake_payment_methods.values())


@router.get("/{payment_method_id}", response_model=PaymentMethod)
def get_payment_method(payment_method_id: int):
    method = _fake_payment_methods.get(payment_method_id)
    if not method:
        raise HTTPException(status_code=404, detail="Forma de pago no encontrada")
    return method


@router.post("/", response_model=PaymentMethod, status_code=201)
def create_payment_method(body: PaymentMethodBase):
    global _next_payment_method_id
    method = PaymentMethod(id=_next_payment_method_id, **body.dict())
    _fake_payment_methods[_next_payment_method_id] = method
    _next_payment_method_id += 1
    return method


@router.put("/{payment_method_id}", response_model=PaymentMethod)
def update_payment_method(payment_method_id: int, body: PaymentMethodBase):
    if payment_method_id not in _fake_payment_methods:
        raise HTTPException(status_code=404, detail="Forma de pago no encontrada")
    updated = PaymentMethod(id=payment_method_id, **body.dict())
    _fake_payment_methods[payment_method_id] = updated
    return updated


@router.delete("/{payment_method_id}", status_code=204)
def delete_payment_method(payment_method_id: int):
    if payment_method_id not in _fake_payment_methods:
        raise HTTPException(status_code=404, detail="Forma de pago no encontrada")
    del _fake_payment_methods[payment_method_id]