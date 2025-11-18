from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["products"])


# GET /api/v1/products
@router.get("/")
def list_products():
    return [
        {"id": 1, "name": "Televisión 50 pulgadas", "price": 8999.99},
        {"id": 2, "name": "Laptop Gamer", "price": 25999.99},
    ]

@router.get("/{product_id}")
def get_product(product_id: int):
    # Dummy data por ahora
    return {"id": product_id, "name": f"Producto {product_id}", "price": 1000.0}