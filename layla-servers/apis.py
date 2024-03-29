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
import translation

# example url
# http://127.0.0.1:7865/generate/theme=people&style=sea&model=maple&steps=5$beach&wind
# $ : options / prompts 구분
# & : prompts 구분
# = : options 구분
# steps= : steps 구분(스텝 수정 가능)
# user-bat : --api 옵션 준 후 실행

# gpt translation
# parser.add_argument("--text", type=str, required=True)
#     parser.add_argument("--quiet", type=bool, default=False)
#     parser.add_argument("--nsamples", type=int, default=1)
#     parser.add_argument('--unconditional', action='store_true', help='If true, unconditional generation.')
#     parser.add_argument("--batch_size", type=int, default=-1)
#     parser.add_argument("--length", type=int, default=-1)
#     parser.add_argument("--temperature", type=int, default=0.7)
#     parser.add_argument("--top_k", type=int, default=40)

URL = "http://127.0.0.1:7860"

app = fastapi.FastAPI()

# http://127.0.0.1:7865/v1/translation/ko$vi$text=text$temperature=0.7$batch_size=1

@app.get('/v1/translation/{domain}')
async def translation(domain: str):
    parser = domain.split('$')
    src = str(parser[0])
    dst = str(parser[1])
    text = str(parser[2].split('=')[1])
    tempreatrue = str(parser[3].split('=')[1])
    batch_size = str(parser[4].split('=')[1])
    print(src, dst, text, tempreatrue, batch_size)

# http://127.0.0.1:7865/translation/ko$vi$text=%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EC%95%BC?

@app.get('/translation/{domain}')
async def translation(domain: str):
    from transformers import pipeline
    parser = domain.split('$')
    src = str(parser[0])
    dst = str(parser[1])
    text = str(parser[2].split('=')[1])
    if src == dst:
        return {"message": f"{text}"}
    if src == "ko" and dst == "vi":
        src = 'ko'
        dst = 'en'
        task_name = f"translation_{src}_to_{dst}"
        model_name = f"Helsinki-NLP/opus-mt-{src}-{dst}"
        translator  = pipeline(task_name, model=model_name, tokenizer=model_name)
        ust = translator(text)[0]['translation_text']
        src = 'en'
        dst = 'vi'
        text = ust
        task_name = f"translation_{src}_to_{dst}"
        model_name = f"Helsinki-NLP/opus-mt-{src}-{dst}"
        translator  = pipeline(task_name, model=model_name, tokenizer=model_name)
        return {"message": f"{translator(text)[0]['translation_text']}"}
    if src == "vi" and dst == "ko":
        src = 'vi'
        dst = 'en'
        task_name = f"translation_{src}_to_{dst}"
        model_name = f"Helsinki-NLP/opus-mt-{src}-{dst}"
        translator  = pipeline(task_name, model=model_name, tokenizer=model_name)
        ust = translator(text)[0]['translation_text']
        print(ust)
        src = 'en'
        dst = 'ko'
        text = ust
        task_name = f"translation_{src}_to_{dst}"
        # Helsinki-NLP/opus-mt-tc-big-en-ko
        # model_name = f"Helsinki-NLP/opus-mt-tc-big-{src}-{dst}"
        model_name = "Helsinki-NLP/opus-mt-tc-big-en-ko"
        translatora  = pipeline(task_name, model=model_name, tokenizer=model_name)
        return {"message": f"{translatora(text)[0]['translation_text']}"}
    
    task_name = f"translation_{src}_to_{dst}"
    model_name = f"Helsinki-NLP/opus-mt-{src}-{dst}"
    translator  = pipeline(task_name, model=model_name, tokenizer=model_name)
    return {"message": f"{translator(text)[0]['translation_text']}"}

@app.get('/test')
def root():
    return {'message': 'Hello World'}

@app.get("/download/imozi/{filename}")
async def root(filename: str):
    UPLOAD_DIR = "C:\\Users\\user\\Desktop\\stable-diffusion-webui\\layla-servers\\imozi" 
    return FileResponse(os.path.join(UPLOAD_DIR, f"{filename}"))

@app.post("/upload/imozi/{user_id}/{imozi_name}/{id}")
async def upload_photo(file: UploadFile, Request : fastapi.Request, user_id: str, id: str, imozi_name: str):
    UPLOAD_DIR = "C:\\Users\\user\\Desktop\\stable-diffusion-webui\\layla-servers\\imozi" 
    import os.path
    os.chdir(UPLOAD_DIR)
    if os.path.isdir(f'{user_id}'):
        os.chdir(f'{UPLOAD_DIR}\\{user_id}')
    else:
        os.mkdir(f'{user_id}')
        os.chdir(f'{UPLOAD_DIR}\\{user_id}')
    
    if os.path.isdir(f'{imozi_name}'):
        return {"message": "이미 존재하는 이모지입니다."}
        
    content = await file.read()
    filename = f"{user_id}_{imozi_name}_{id}.jpg" 
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)

    return {"filename": filename}


@app.get("/download/user-content/{filename}")
async def root(filename: str):
    UPLOAD_DIR = "C:\\Users\\user\\Desktop\\stable-diffusion-webui\\layla-servers\\user_content" 
    return FileResponse(os.path.join(UPLOAD_DIR, f"{filename}"))

@app.post("/upload/{user_id}/content")
async def upload_photo(file: UploadFile, Request : fastapi.Request, user_id: str):
    UPLOAD_DIR = "C:\\Users\\user\\Desktop\\stable-diffusion-webui\\layla-servers\\user_content" 
    
    content = await file.read()
    filename = f"{user_id}_{str(uuid.uuid4())}.jpg" 
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)

    return {"filename": filename}

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
    
    vector = FileResponse(f'{uuids}.png', media_type='image/png')
    print(uuids)
    
    # infomation
    # response : base64 image header
    # response2 : png info
    
    return vector

@app.get("/generate/info/{uuids}")
async def generate_info(uuids: str):
    os.chdir('C:\\Users\\user\\Desktop\\stable-diffusion-webui\\layla-servers\\cache')
    vector = FileResponse(f'{uuids}.png', media_type='image/png')
    print(uuids)
    return vector

# # pro request ( ADD Model Selection )
# http://127.0.0.1:7865/v1/generate/width=512&height=512&steps=50&seed=-1&cfgscale=7&batch_size=1$sea&water&beach&sketch$error&lowres
# $ : options / prompts 구분
# & : prompts 구분
# = : options 구분

# width    | # negative prompt
# height    | 
# steps
# seed
# cfgscale
# prompt

@app.get("/v1/generate/{prompt}")
def generate(prompt: str, Request: fastapi.Request):
    import uuid
    prompts = prompt.split('$')
    options = prompts[0].split('&')
    prompt = prompts[1].split('&')
    negative_prompt = prompts[2].split('&')
    
    width = options[0].split('=')[1]
    height = options[1].split('=')[1]
    steps = options[2].split('=')[1]
    seed = options[3].split('=')[1]
    cfgscale = options[4].split('=')[1]
    batch_size = options[5].split('=')[1]
    
    prompts = ", ".join(prompt)
    negative_prompt = ", ".join(negative_prompt)
    
    if int(width) >= 4096 | int(height) >= 8095:
        return "Error : 가로 혹은 세로 길이가 너무 큽니다."
    elif int(steps) >= 100:
        return "Error : 스텝 수가 너무 높습니다. 스텝을 변경한 후 요청해주세요"
    elif int(batch_size) >= 5:
        return "Error : 배치 사이즈가 너무 큽니다. 잠시 후 다시 시도해주세요"
    
    payload = {
        "prompt": prompts,
        "negative_prompt": negative_prompt,
        "seed": int(seed),
        "batch_size": int(batch_size),
        "steps": int(steps),
        "cfg_scale": int(cfgscale),
        "width": int(width),
        "height": int(height)
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
    
    vector = FileResponse(f'{uuids}.png', media_type='image/png')
    
    return vector
    
if __name__ == "__main__":
    uvicorn.run("apis:app", port=7865, reload=True)