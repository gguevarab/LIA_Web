from flask import Flask, jsonify, request, Blueprint
from dotenv import load_dotenv
import os


books_bp = Blueprint('books', __name__)

@books_bp.route('/books', methods=['GET'])
def get_books():
    return jsonify(os.listdir('content')), 200

@books_bp.route('/books/<string:name>', methods=['DELETE'])
def delete_book(name):
    os.rmdir('content/' + name)
    return jsonify(f'Success: {name} deleted'), 200

