from flask import jsonify, request, Blueprint
from PyPDF2 import PdfReader
import os


material_bp = Blueprint('material', __name__)

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

@material_bp.route('/books/<string:name>', methods=['GET'])
def get_generations(name):
    return jsonify(os.listdir('content/' + name + "/generations")), 200

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
