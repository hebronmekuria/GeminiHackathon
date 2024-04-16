import datetime
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

# Function to update conversation history
def update_conversation_history(prompt, response):
  timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
  history_entry = f"{prompt}\t{response}\t{timestamp}\n"
  with open("conversation_history.txt", "a") as f:
    f.write(history_entry)

# Function to retrieve conversation history
def retrieve_conversation_history():
  conversation_history = []
  with open("conversation_history.txt", "r") as f:
    for line in f:
      prompt, response, timestamp = line.strip().split("\t")
      conversation_history.append((prompt, response, timestamp))
  return conversation_history
def update_prompt_with_context(prompt, conversation_history):
  """
  This function updates the prompt with relevant context from the conversation history.

  Args:
      prompt: The original prompt to be used for the API call.
      conversation_history: A list of tuples containing (prompt, response, timestamp) for past interactions.

  Returns:
      The updated prompt incorporating relevant context from the conversation history.
  """

  # Define keywords to identify relevant context (can be customized)
  context_keywords = ["rubrik", "essay", "requirements"]

  # Analyze conversation history and extract relevant snippets
  context_snippets = []
  for convo in conversation_history:
    past_prompt, _, _ = convo
    for keyword in context_keywords:
      if keyword.lower() in past_prompt.lower():
        context_snippets.append(convo[0])  # Append the entire past prompt containing the keyword

  # Update the prompt with context snippets (can be customized)
  updated_prompt = prompt
  for snippet in context_snippets:
    updated_prompt += ". In the previous interaction, you told me " + snippet

  return updated_prompt


#Function to run pdf-->jpg conversion script
def convert(input_pdf):
    try:
        # Run the Bash script with the PDF file as an argument
        output = subprocess.check_output(['./scripts.sh', input_pdf], stderr=subprocess.STDOUT)
        print(output.decode())
    except subprocess.CalledProcessError as e:
        pass

# Function to make a single API call with context retrieval and update
def makeAPICallWithContext(prompt, model_type=genai.GenerativeModel('gemini-pro')):
    # Retrieve conversation history (implementation depends on your chosen storage)
    conversation_history = retrieve_conversation_history()

    # Update prompt with relevant context from history
    prompt = update_prompt_with_context(prompt, conversation_history)

    # Make the API call
    response = model_type.generate_content(prompt)

    # Update conversation history with prompt and response
    update_conversation_history(prompt, response.text)

    return response

# Function to process the rubrik
def process_rubrik(rubrik_path, essay_path):
    # Convert rubrik to JPG
    convert(rubrik_path)

    # ... (extract information about requirements from JPGs - potentially using separate models)

    # Make the initial API call to inform about rubrik and essay
    prompt = "I will be uploading a rubrik and an essay. The rubrik contains the evaluation criteria. Wait until I tell you to start grading."
    response = makeAPICallWithContext(prompt)

    # Process the essay
    # ... (similar approach as rubrik - potentially using separate models for essay images)

    # Final prompt referencing context (rubrik requirements and essay content)
    prompt = "I have uploaded both the rubrik and the essay. Can you summarize the rubrik's requirements and evaluate the essay based on those criteria?"
    response = makeAPICallWithContext(prompt)

    print(response.text)

# Main function
def main():
    process_rubrik("rubrik.pdf", "essay.pdf")

if __name__ == "__main__":
    main()