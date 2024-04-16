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
        pass

#Input: file path 
def makeAPIRequest(rubrik_path, essay_path):
     
     #Start by processing the file into a jpg
    convert(rubrik_path)

    #Create empty file for storage
    rubrik_txt="rubrik.txt"
    with open(rubrik_txt, 'w') as file:
        file.write("")

     #Find the output directory location
    elements=rubrik_path.split("/")
    filename=elements[-1]
    basename=filename.split(".")[0]
    output_location="/".join(elements[:len(elements)-1])+"output_"+basename

    
     #Initialize the interaction with the API
    # prompt = "I am going to give you multiple pages of a single document as a jpg file, and I don't want you to " 
    # "process the document until I tell you that all the pages have been provided. However, for each jpg file, "
    # "I want you to trasncribe the contents of the file back to me. Parse the entire jpg to extract any textual information."
    # model = genai.GenerativeModel('gemini-pro')
    # response = model.generate_content(prompt)

     #Loop through elements in the output directory
    for dirpath, dirnames, filenames in os.walk(output_location):
        dirnames.sort()
        filenames.sort()
        for filename in filenames:
            full_file_path = os.path.join(dirpath, filename)
            img = PIL.Image.open(full_file_path)
            model = genai.GenerativeModel('gemini-pro-vision') 
            response=model.generate_content(["The following image contains a part of a rubrik"
                                             "for a class essay. Ingest the contents of the rubrik and give a detailed"
                                             "explanation of what it is saying", img]) 
            with open(rubrik_txt, 'a') as file:
                file.write(response.text + '\n')
    

    #Part 2 to convert the essay
      
    convert(essay_path)
    essay_txt = "essay.txt"
    with open(essay_txt, 'w') as file:
        file.write("")

     #Find the output directory location
    elements=essay_path.split("/")
    filename=elements[-1]
    basename=filename.split(".")[0]
    output_location="/".join(elements[:len(elements)-1])+"output_"+basename
    

     #Initialize the interaction with the API
    prompt = "I will give you an essay as multiple jpg files. Do not process the paper until I tell you that " 
    "I have provided all the pages. Additionally, for each part given, transcribe the contents of the jpg file. "
    model = genai.GenerativeModel('gemini-pro')
    response=model.generate_content(prompt)  


     #Loop through elements in the output directory
    for dirpath, dirnames, filenames in os.walk(output_location):
        dirnames.sort()
        filenames.sort()
        for filename in filenames:
            full_file_path = os.path.join(dirpath, filename)
            img = PIL.Image.open(full_file_path)
            model = genai.GenerativeModel('gemini-pro-vision') 
            response = model.generate_content(["", img]) 
            with open(essay_txt, 'a') as file:
                file.write(response.text + '\n')
    
    prompt = "I am done uploading the essay. Can you first tell me what the essay is about and what the requirements of the rubrik at"
    model = genai.GenerativeModel('gemini-pro')
    response=model.generate_content(prompt)

     #Grading the essay
    with open(rubrik_txt, 'r') as file:
    # Read the entire content of the file into a single string
        rub = file.read()
    with open(essay_txt, 'r') as file:
    # Read the entire content of the file into a single string
        ess = file.read()
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Please grade this essay:" + ess + "based on these grading rubrik's and criteria" + rub + "Give a "
                                      "grade as well as a detailed description of each piece of the rubrik and why the work deserves the given"
                                      "grade") 
    print(response.text)
    



makeAPIRequest("rubrik.pdf","essay.pdf")

