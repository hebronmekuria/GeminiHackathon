import google.generativeai as genai
import PIL.Image
import subprocess

#These imports are used to import the .env file which contains the API key
from dotenv import load_dotenv
import os

#Fetch the API Key
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)


#Function to run pdf-->jpg conversion script
def convert(input_pdf):
    try:
        # Run the Bash script with the PDF file as an argument
        output = subprocess.check_output(['./scripts.sh', input_pdf], stderr=subprocess.STDOUT)
        print(output.decode())
    except subprocess.CalledProcessError as e:
        print("Failed to convert PDF:", e.output.decode())
        print("Return Code:", e.returncode)

#Function sends files and prompt to the Gemini API
def makeAPIRequest(rubrik,essay):
     

