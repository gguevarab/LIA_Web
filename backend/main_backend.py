from flask import Flask
from flask_cors import CORS
import os

from routes.books import books_bp
from routes.material import material_bp
from routes.generations import generations_bp


app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(books_bp)
app.register_blueprint(material_bp)
app.register_blueprint(generations_bp)

if __name__ == '__main__':
    # If generations folder doesn't exist, create one
    if not os.path.exists('content'):
        os.makedirs('content')
        
    app.run(debug=True)
