from flask import Flask, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file:
        # Save the file to the server's filesystem
        filepath = '/path/to/save/' + file.filename
        file.save(filepath)
        return "File uploaded and processed successfully", 200

if __name__ == '__main__':
    app.run(debug=True)
