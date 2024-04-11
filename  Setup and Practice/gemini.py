import google.generativeai as genai

#These imports are used to import the .env file which contains the API key
from dotenv import load_dotenv
import os

#Fetch the API Key
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)



#Practice with a text prompt

# model = genai.GenerativeModel('gemini-pro')
# response = model.generate_content("Give me ten names of cats")
# print(response.text)


#Practice with an image + text prompt

# import PIL.Image
# img = PIL.Image.open('image.jpg')
# img
# prompt = """This image contains a sketch of a potential product along with some notes.
# Given the product sketch, describe the product as thoroughly as possible based on what you
# see in the image, making sure to note all of the product features. Return output in json format:
# {description: description, features: [feature1, feature2, feature3, etc]}"""

# model = genai.GenerativeModel('gemini-pro-vision') #different model from before
# response = model.generate_content([prompt, img]) #generate_content method takes multiple forms of inputs
# print(response.text)


#Practice with chat history

# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])
# response = chat.send_message("In one sentence, explain how a computer works to a young child.")
# print(response.text)
# response = chat.send_message("Okay, how about a more detailed explanation to a high schooler?")
# print(response.text)
# print(chat.history)

#Temperature and Limit Setting for prompts
#Higher Temperature - more creative responses

# model = genai.GenerativeModel(
#     'gemini-pro',
#     generation_config=genai.GenerationConfig(
#         max_output_tokens=2000,
#         temperature=0.9, #Temp setting
#     ))

# response = model.generate_content(
#     'Give me a numbered list of cat facts.',
#     # Limit to 5 facts.
#     generation_config = genai.GenerationConfig(stop_sequences=['\n6'])
# )
# print(response.text)

#Practice using audio file

#I did have to first run this in the terminal:
#wget -q $URL -O sample.mp3 -q "https://storage.googleapis.com/generativeai-downloads/data/State_of_the_Union_Address_30_January_1961.mp3" -O sample.mp3

#python code...
# URL = "https://storage.googleapis.com/generativeai-downloads/data/State_of_the_Union_Address_30_January_1961.mp3"
# your_file = genai.upload_file(path='sample.mp3')
# prompt = "Listen carefully to the following audio file. Provide a brief summary."
# model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
# response = model.generate_content([prompt, your_file])
# print(response.text)