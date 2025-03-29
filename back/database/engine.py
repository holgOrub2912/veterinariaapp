from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql+psycopg2://postgres:isabela2912@localhost/veterinariaBD"
engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session