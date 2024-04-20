from flask import Blueprint, Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '../Database/__pycache__'))
from db import create_connection, store_file_path, retrieve_file_paths, reset_table

bp = Blueprint('upload', __name__, url_prefix='/upload')
CORS(bp)

# This file holds all our backend API endpoints


#This endpoint is attached to both of the buttons that upload a file
@bp.route('/file', methods=['POST'])
def upload_file():
    #extract the headers from the API request to be used in storing the file paths
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


#import the function that we are about to call in the next endpoint function
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from src import main

@bp.route('/process', methods=['POST'])
def api_call():
    user_id = request.headers.get('User-ID', "3")
    nature = request.headers.get('Nature', 'default_nature')
    conn = create_connection()
    try:
        rubrik_paths = retrieve_file_paths(conn, "3", "rubrik")
        rubrik_path = rubrik_paths[0] if rubrik_paths else ""
    except:
        return jsonify({"error": "No rubriks found"}), 404
    try:
        essay_paths = retrieve_file_paths(conn, "3", 'essay')
        essay_path = essay_paths[0] if essay_paths else ""
    except:
        return jsonify({"error": "No essays found"}), 404
    result = main(rubrik_path, essay_path)
    
    return jsonify(result)

#Attached to the little reset button
@bp.route('/reset', methods=['POST'])
def reset_database():
    """ Endpoint to reset the file_paths table in the database """
    conn = create_connection()
    try:
        reset_table(conn)
        return jsonify({"message": "Database reset"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Attached to the dashboard where we try to find the previously uploaded rubriks and essays
@bp.route('/files', methods=['GET'])
def get_files():
    user_id = request.args.get('user_id', default="3")  # Default user_id is "3"
    nature = request.args.get('nature', default="rubrik")  # Default nature is "rubrik"
    conn = create_connection()
    file_paths = retrieve_file_paths(conn, user_id, nature)
    if file_paths!=[]:
        return jsonify({"file_paths": file_paths}), 200
    else:
        return jsonify({"error": "No files found for the specified criteria"}), 404
