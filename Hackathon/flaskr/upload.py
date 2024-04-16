from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

bp = Blueprint('upload', __name__, url_prefix='/upload')

@bp.route('/file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    filename = secure_filename(file.filename)
    save_path = '.'
    if not os.path.exists(save_path):
        print("New File Created")
        os.makedirs(save_path)  # Ensure directory exists
    file.save(os.path.join(save_path, filename))
    return jsonify({"message": "File uploaded successfully "}), 200
