import google.generativeai as genai

#These imports are used to import the .env file which contains the API key
from dotenv import load_dotenv
import os

#Fetch the API Key
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')

#Practice with a text prompt
# response = model.generate_content("Give me ten names of cats")
# print(response.text)


#Practice with an image + text prompt
import PIL.Image
img = PIL.Image.open('image.jpg')
img
prompt = """This image contains a sketch of a potential product along with some notes.
Given the product sketch, describe the product as thoroughly as possible based on what you
see in the image, making sure to note all of the product features. Return output in json format:
{description: description, features: [feature1, feature2, feature3, etc]}"""

model = genai.GenerativeModel('gemini-pro-vision') #different model from before
response = model.generate_content([prompt, img]) #generate_content method takes multiple forms of inputs
print(response.text)


