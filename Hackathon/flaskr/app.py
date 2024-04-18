from flask import Blueprint, Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '../Database/__pycache__'))
from db import create_connection, store_file_path, retrieve_file_paths, reset_table

bp = Blueprint('upload', __name__, url_prefix='/upload')
CORS(bp)


@bp.route('/file', methods=['POST'])
def upload_file():
    user_id = request.headers.get('User-ID', 3)
    nature = request.headers.get('nature', 'rubrik')
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    save_path = '.'  # It's better to specify a folder for uploads
    if not os.path.exists(save_path):
        print("New directory created for file uploads.")
        os.makedirs(save_path)  # Ensure directory exists
    
    file_path = os.path.join(save_path, filename)
    file.save(file_path)
    
    conn = create_connection()
    store_file_path(conn, user_id, file_path, nature)
    return jsonify({"message": "File uploaded successfully", "path": file_path})

# Additional routes or functions can go here


sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from src import main

@bp.route('/process', methods=['POST'])
def api_call():
    user_id = request.headers.get('User-ID', "3")
    nature = request.headers.get('Nature', 'default_nature')
    conn = create_connection()
    try:
        rubrik_paths = retrieve_file_paths(conn, "3", "rubrik")
    except:
        return "Error: No rubriks found"
    try:
        essay_paths = retrieve_file_paths(conn, "3", 'essay')
    except:
        return "Error: No essays found"
    result = main(rubrik_paths,essay_paths)
    
    
    return jsonify(result)

@bp.route('/reset', methods=['POST'])
def reset_database():
    """ Endpoint to reset the file_paths table in the database """
    conn = create_connection()
    try:
        reset_table(conn)
        return jsonify({"message": "Database reset"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/files', methods=['GET'])
def get_files():
    user_id = request.args.get('user_id', default="3")  # Default user_id is "3"
    nature = request.args.get('nature', default="rubrik")  # Default nature is "rubrik"
    conn = create_connection()
    file_paths = retrieve_file_paths(conn, user_id, nature)
    if file_paths:
        return jsonify({"file_paths": file_paths}), 200
    else:
        return jsonify({"error": "No files found for the specified criteria"}), 404
