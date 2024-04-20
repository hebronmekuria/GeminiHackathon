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

#Function to extract the content out of the given jpeg files. 
def extract(file_path,type):
    convert(file_path)
    elements = file_path.split("/")
    filename=elements[-1]
    basename=filename.split(".")[0]
    #Determine the location that the .txt file will be in
    output_location="/".join(elements[:len(elements)-1])+"output_"+basename
    storage_file=basename+".txt"
    #create new .txt file
    with open(storage_file, 'w') as file:
        file.write("")
    #go through the folder with all the jpeg files and send each of them to Gemini for transcription
    for dirpath, dirnames, filenames in os.walk(output_location):
        dirnames.sort()
        filenames.sort()
        for filename in filenames:
            full_file_path = os.path.join(dirpath, filename)
            img = PIL.Image.open(full_file_path)
            model = genai.GenerativeModel('gemini-pro-vision') 
            if type == "rubrik":
                prompt = "The following image contains a part of a rubrik"
                "for a class essay. Ingest the contents of the rubrik and give a detailed"
                "explanation of what it is saying"
            else:
                prompt = "Transcribe the contents of this image file"
            response=model.generate_content([prompt, img])               
            with open(storage_file, 'a') as file:
                file.write(response.text + '\n')

#Helper function to extrac the base name from a file name with any ending
def findBaseName(path):
    elements = path.split("/")
    filename=elements[-1]
    basename=filename.split(".")[0]
    return basename    

#Main function that sends the API request to do the grading. The inputs are the essay and rubrik .txt files.
def makeAPIRequest(rubrik, essay):
    model = genai.GenerativeModel('gemini-pro')
    if rubrik == "":
        response = model.generate_content("Please grade this essay:" + essay + "based on these grading rubrik's and criteria" + rubrik + "Give a "
                                      "grade as well as a detailed description of each piece of the rubrik and why the work deserves the given"
                                      "grade") 
    else:
        response = model.generate_content("Please grade this student's work based on correctness" + essay)
    return response.text

#Packaged function to be called from API    
def main(rubrik_path, essay_path):
    extract(essay_path,'essay')
    basename=findBaseName(essay_path)
    storage_file=basename+".txt"    
    with open(storage_file, 'r') as file:
                ess = file.read()
    if rubrik_path == "":
        rub = ""
    else:
        basename=findBaseName(rubrik_path)
        storage_file=basename+".txt"
        try:
            with open(storage_file, 'r') as file:
                rub = file.read()
        except:
            extract(rubrik_path,'rubrik')
            with open(storage_file, 'r') as file:
                rub = file.read()
    return makeAPIRequest(rub,ess)
            
  


