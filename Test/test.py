# # 1st way (Terrible)
# import pdfplumber


# def extractText(pdf_path):
#     with pdfplumber.open(pdf_path) as pdf:
#         all_text = ""
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             all_text += page_text + "\n"
#     return all_text

# # 2nd way (Line by Line)
# from PyPDF2 import PdfReader

# def extract_text_from_pdf(pdf_path):
#     reader = PdfReader(pdf_path)
#     text = ""
#     for page in reader.pages:
#         text += page.extract_text()
#     return text

# pdf_text = extract_text_from_pdf("rubrik.pdf")

# # 3rd Best way (Keeps source spacing)
import fitz # install using: pip install PyMuPDF
def extractText(pdf_path):
    with fitz.open(pdf_path) as pdf:
        pdf_text = ""
        for page in pdf:
            pdf_text += page.get_text()
    return pdf_text


pdf_text = extractText("Test/essay.pdf")


def writeToFile(text, file_path):
    with open(file_path, 'w') as file:
        file.write(text)


writeToFile(pdf_text, 'essay.txt')


