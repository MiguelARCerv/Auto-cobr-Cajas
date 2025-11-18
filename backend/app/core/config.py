from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Proyecto Tienda Online"
    API_V1_PREFIX: str = "/api/v1"
    ENVIRONMENT: str = "dev"

    class Config:
        env_file = ".env"


settings = Settings()