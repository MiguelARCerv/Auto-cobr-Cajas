from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.routes_products import router as products_router
from app.api.v1.routes_categories import router as categories_router
from app.api.v1.routes_suppliers import router as suppliers_router
from app.api.v1.routes_discounts import router as discounts_router
from app.api.v1.routes_coupons import router as coupons_router
from app.api.v1.routes_payment_methods import router as payment_methods_router


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version="0.1.0",
    )

    @app.get("/health", tags=["health"])
    def health_check():
        return {"status": "ok"}

    prefix = settings.API_V1_PREFIX

    app.include_router(products_router, prefix=prefix)
    app.include_router(categories_router, prefix=prefix)
    app.include_router(suppliers_router, prefix=prefix)
    app.include_router(discounts_router, prefix=prefix)
    app.include_router(coupons_router, prefix=prefix)
    app.include_router(payment_methods_router, prefix=prefix)

    return app


app = create_application()