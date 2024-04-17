from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import sys

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
    return os.path.join(save_path, filename)

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from src import main

@bp.route('/process', methods=['POST'])
def api_call():
    file_path1 = request.form.get('file_path1')
    file_path2 = request.form.get('file_path2')
    if not file_path1 or not file_path2:
        return jsonify({"error": "File paths are required"}), 400
    result = main(file_path1, file_path2)
    return result