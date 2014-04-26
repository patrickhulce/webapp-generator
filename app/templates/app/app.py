from flask import Flask, jsonify, request
from routes import api

app = Flask(__name__)

app.regiser_blueprint(api, url_prefix='/api')