import fastapi
import uvicorn
import datetime
import json
from base64 import b64encode
import requests
import io
import base64
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from PIL import Image, PngImagePlugin
import os
import uuid

# example url
# http://127.0.0.1:7865/generate/theme=people&style=sea&model=maple&steps=5$beach&wind
# $ : options / prompts 구분
# & : prompts 구분
# = : options 구분
# steps= : steps 구분(스텝 수정 가능)
# user-bat : --api 옵션 준 후 실행

URL = "http://127.0.0.1:7860"

app = fastapi.FastAPI()

@app.get('/test')
def root():
    return {'message': 'Hello World'}

@app.get("/generate/{prompt}")
def generate(prompt: str, Request: fastapi.Request):
    import uuid
    objects = prompt.split('$')
    options = objects[0].split('&')
    theme = options[0].split('=')[1]
    style = options[1].split('=')[1]
    model = options[2].split('=')[1]
    steps = options[3].split('=')[1]
    print(f"[LOG - {datetime.datetime.now()}] {Request.client.host} - {prompt} - steps : {steps}")
    prompts = list(objects[1].split('&'))
    
    prompts.append(theme)
    prompts.append(style)
    prompts.append(model)
    
    payload = {
        "prompt": ", ".join(prompts),
        "steps": int(steps)
    }
    response = requests.post(url=f'{URL}/sdapi/v1/txt2img', json=payload)
    r = response.json()
    
    for i in r['images']:
        png_payload = { 
            "image": "data:image/png;base64," + i
        }
    
    uuids = uuid.uuid4()
    os.chdir('C:\\Users\\user\\Desktop\\stable-diffusion-webui\\layla-servers\\cache')
    image = Image.open(io.BytesIO(base64.b64decode(i.split(",",1)[0])))
    image.save(f'{uuids}.png')
    response2 = requests.post(url=f'{URL}/sdapi/v1/png-info', json=png_payload)
    
    # infomation
    # response : base64 image header
    # response2 : png info
    
    return FileResponse(f'{uuids}.png', media_type='image/png')

if __name__ == "__main__":
    uvicorn.run("apis:app", port=7865, reload=True)