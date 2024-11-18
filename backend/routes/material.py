from flask import jsonify, request, Blueprint, abort
from PyPDF2 import PdfReader
import os
import json


material_bp = Blueprint('material', __name__)

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

@material_bp.route('/books/<string:name>', methods=['GET'])
def get_materials(name):
    metadata_path = f'content/{name}/metadata.json'

    try:
        # Check if the file exists and read it
        with open(metadata_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        # Return a 404 error if the file doesn't exist
        abort(404, description="Metadata not found")
    except json.JSONDecodeError:
        # Return a 500 error if the JSON file is invalid
        abort(500, description="Invalid JSON format")

    # Return the JSON data
    return jsonify(data), 200

@material_bp.route('/books/<string:name>', methods=['POST'])
def add_material(name):

    # We create the folder first
    os.makedirs('content/' + name, exist_ok=True)
    os.makedirs('content/' + name + "/generations", exist_ok=True)

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    file.save(os.path.join('content/' + name, file.filename))

    text = extract_text_from_pdf('content/' + name + '/' + file.filename)

    # We write the text on a file
    with open(f'content/{name}/source.txt', 'w', encoding='utf-8') as f:
        f.write(text)

    # We delete the pdf to save space
    os.remove('content/' + name + '/' + file.filename)    

    return jsonify({"message": f"File {file.filename} uploaded successfully and book created"}), 201
