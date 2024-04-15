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
        print("Return Code:", e.returncode)

#Input: file path 
def makeAPIRequest(rubrik_path, essay_path):
     
     #Start by processing the file into a jpg
    convert(rubrik_path)

     #Find the output directory location
    elements=rubrik_path.split("/")
    filename=elements[-1]
    basename=filename.split(".")[0]
    ouput_location="/".join(elements[:len(elements)-1])+"/output_"+basename


     #Initialize the interaction with the API
    prompt = "I am going to upload a few files, but I don't want you to do anything until I'm done uploading all the files."
    model = genai.GenerativeModel('gemini-pro')
    chat = model.start_chat(history=[])
    chat.send_message(prompt)


     #Loop through elements in the output directory
    for dirpath, dirnames, filenames in os.walk(ouput_location):
        for filename in filenames:
            full_file_path = os.path.join(dirpath, filename)
            img = PIL.Image.open(full_file_path)
            chat.send_message(img) 
    
    prompt = "The files I have given you are the ordered pages of a rubrik. I want you to use them to evaluate a student's essay. Wait until I give you the essay."
    response=chat.send_message(prompt)
    print(chat.history)
'''
    #Part 2 to convert the essay
         
    convert(essay_path)

     #Find the output directory location
    elements=essay_path.split("/")
    filename=elements[-1]
    basename=filename.split(".")[0]
    ouput_location="/".join(elements[:len(elements)-1])+"/output_"+basename


     #Initialize the interaction with the API
    prompt = "alright, here is the essay to be evaluated. The essay has multiple pages so don't start grading until I finish uploading all the pages and tell you to start"
    model = genai.GenerativeModel('gemini-pro')
    model.generate_content(prompt)


     #Loop through elements in the output directory
    for dirpath, dirnames, filenames in os.walk(ouput_location):
        for filename in filenames:
            full_file_path = os.path.join(dirpath, filename)
            img = PIL.Image.open(full_file_path)
            model = genai.GenerativeModel('gemini-pro-vision') 
            model.generate_content(["", img]) 
    
    prompt = "I am done uploading the essay. Please evaludate the essay using the given rubrik, and give a grading. Be detailed and thorough in your grading."
    model = genai.GenerativeModel('gemini-pro')
    response=model.generate_content(prompt)
    print(response.text)
'''

makeAPIRequest("rubrik.pdf","essay.pdf")

