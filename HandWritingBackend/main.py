from fastapi import FastAPI, File, UploadFile
import os
from starlette.middleware.cors import CORSMiddleware

from ml_utils import  predicttext

app = FastAPI()

origins = [
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    # Get the file name
    filename = file.filename

    # Specify the folder where you want to save the image
    save_folder = "images"

    # Create the folder if it doesn't exist
    os.makedirs(save_folder, exist_ok=True)

    # Path to save the image
    save_path = os.path.join(save_folder, filename)

    # Save the image
    with open(save_path, "wb") as image:
        image.write(await file.read())

    predicttext(save_path)

    return {"path": predicttext(save_path), "message": "my message"}



#  python -m uvicorn main:app --reload