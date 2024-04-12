import google.generativeai as genai

#These imports are used to import the .env file which contains the API key
from dotenv import load_dotenv
import os

#Fetch the API Key
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("Give me ten names of cats")
print(response.text)