from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/list')
def list():
    return jsonify(status='success',results=[])