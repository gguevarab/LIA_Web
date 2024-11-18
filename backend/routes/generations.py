from flask import jsonify, request, Blueprint
from dotenv import load_dotenv
from charset_normalizer import from_path
import os
from openai import OpenAI
from datetime import datetime
import json


# Load the access key
load_dotenv()
client = OpenAI(
    api_key=os.environ.get('OPENAI_API_KEY')
    )

generations_bp = Blueprint('generations', __name__)
prompts = {
    "test": "Please make a practice test of the following text. The test should be perfectly formated for markdown reading with nice aesthetics and it should contains different types of problems (multiple choice, open, etc). Please add at the end the answers: ",
    "summary": "Please summarize the following text. The summary should be perfectly formated for markdown reading with nice aesthetics: ",
    "eli": "Please ELI5 the following text. The ELI5 should be perfectly formated for markdown reading with nice aesthetics: ",
    "flashcards": "Generate a list of 20 key terms and definitions based on the following text. Each key term should be followed by its definition.\nONLY KEY TERMS AND CONCPETS YOU DEEM AS IMPORTANT AND CAN HELP THE STUDENT LEARN. It should come in the following format: term: definition \n"
}

def append_metadata(name, title, description, isFlashcards):
    metadata_path = f'content/{name}/metadata.json'
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if not os.path.exists(metadata_path):
        data = []
    else:
        with open(metadata_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = []  # Start fresh if file content is invalid
    
    next_index = len(data) if data else 0

    # Append the new metadata
    data.append({"index": next_index, "title": title, "date": now, "description": description, "isflashcards": isFlashcards})

    # Write the updated content back to the file
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)  


@generations_bp.route('/books/<string:name>/gen/<string:title>', methods=['GET'])
def get_generation(name, title):
    file_path = f'content/{name}/generations/{title}.md'
    result = from_path(file_path).best()
    content = str(result)
    return jsonify(content), 200

@generations_bp.route('/books/<string:name>/gen', methods=['POST'])
def add_generation(name):

    with open("content/" + name + "/source.txt", "r", encoding="utf-8") as file:
        content = file.read()

    data = request.get_json()

    title = data['title']
    description = data['description']
    prompt = data['prompt']
    isflashcards = data['isflashcards']

    prompt = prompts[prompt]

    response = None 

    if isflashcards:
        response = client.chat.completions.create(
             model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": 'You are a helpful flashcard maker. You will not engage in any conversation with the user outside of generating flashcards. You will output the exact format as requested. You will not output anything else. Not even a "Sure thing" or anything similar. Just the precise format of the flashcards. Everything will be in plain text, so no markdown format. Your objective is to make flashcards so students can review important concepts. So do your best.'
                },
                {
                    "role": "user", 
                    "content": prompt + content
                }
            ]
        )
    else:
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
    with open(f'content/{name}/generations/{title}.md', 'w', encoding='utf-8') as f:
        f.write(generation)

    append_metadata(name, title, description, data['isflashcards'])

    return jsonify({"message": f"Generation {title} created"}), 201

@generations_bp.route('/books/<string:name>/gen/<string:title>', methods=['DELETE'])
def delete_generation(name, title):
    os.remove('content/' + name + '/generations/' + title + '.md')
    return jsonify(f'Success: {title} deleted'), 200