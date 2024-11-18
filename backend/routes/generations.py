from flask import jsonify, request, Blueprint
from dotenv import load_dotenv
from charset_normalizer import from_path
import os
from openai import OpenAI


# Load the access key
load_dotenv()
client = OpenAI(
    api_key=os.environ.get('OPENAI_API_KEY')
    )

generations_bp = Blueprint('generations', __name__)

@generations_bp.route('/books/<string:name>/gen/<string:title>', methods=['GET'])
def get_generations(name, title):
    file_path = f'content/{name}/generations/{title}.md'
    result = from_path(file_path).best()
    content = str(result)
    return jsonify(title, content), 200

@generations_bp.route('/books/<string:name>/gen', methods=['POST'])
def add_generation(name):

    with open("content/" + name + "/source.txt", "r", encoding="utf-8") as file:
        content = file.read()

    data = request.get_json()

    title = data['title']
    prompt = data['prompt']

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system", 
                "content": 'You are a professional teacher, passionate about helping students learn and succeed. Your explanations are clear, detailed, and easy to understand, always aiming to make even the most complex topics accessible to everyone. You are patient, empathetic, and always take the time to ensure students grasp the material fully, guiding them step by step. Your goal is to help students pass their exams with confidence, fostering a positive learning environment where no question is too small and every explanation is crafted with care. Your test are loved by everyone and are perfect for the students to evaluate their knowledge'
            },
            {
                "role": "user", 
                "content": prompt + content
            }
        ]
    )

    generation = response.choices[0].message.content

    # We write the generation on a file
    with open(f'content/{name}/generations/{title}.md', 'w') as f:
        f.write(generation)

    return jsonify({"message": "Generation added successfully"}), 201


@generations_bp.route('/books/<string:name>/gen/<string:title>', methods=['DELETE'])
def delete_generation(name, title):
    os.remove('content/' + name + '/generations/' + title + '.md')
    return jsonify(f'Success: {title} deleted'), 200