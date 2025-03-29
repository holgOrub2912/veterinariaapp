
from fastapi import FastAPI, HTTPException, Depends
from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from passlib.context import CryptContext
from sqlmodel import Session, select
from models.models import Usuario, UsuarioCreate
from database.engine import get_session
from security.security import get_password_hash, verify_password

app = FastAPI()

# Configurar CORS
origins = [
    "http://localhost:5173",  # Añade aquí los orígenes permitidos
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta para registrar un usuario
@app.post("/api/usuarios")
async def create_user(usuario: UsuarioCreate, session: Session = Depends(get_session)):
    # Hashear la contraseña antes de guardarla
    hashed_password = get_password_hash(usuario.password)
    print(hashed_password)
    new_user = Usuario(
        cedula=usuario.cedula,
        nombre=usuario.nombre,
        password_hash=hashed_password
    )
    session.add(new_user)
    session.commit()
    return {"message": "Usuario registrado exitosamente"}

# Ruta para iniciar sesión
@app.post("/api/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session)
):
    user = session.exec(select(Usuario).where(Usuario.nombre == form_data.username)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Verificar la contraseña
    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    
    return {"message": "Inicio de sesión exitoso", "username": user.nombre}