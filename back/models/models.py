from sqlmodel import Field, SQLModel

from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql+psycopg2://postgres:isabela2912@localhost/veterinariaBD"
engine = create_engine(DATABASE_URL)

class UsuarioBase(SQLModel):
    cedula: int
    nombre: str = Field(index=True)

class UsuarioCreate(UsuarioBase):
    password: str  # Contraseña en texto plano (solo para entrada)

class Usuario(UsuarioBase, table=True):
    id: int = Field(default=None, primary_key=True)
    password_hash: str  # Contraseña hasheada (almacenada en la base de datos)

# Crear las tablas 
if __name__ == "__main__":
    SQLModel.metadata.drop_all(engine)  
    SQLModel.metadata.create_all(engine)