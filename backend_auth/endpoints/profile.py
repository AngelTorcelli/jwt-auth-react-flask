from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from middleware import require_jwt_and_roles

profile_bp = Blueprint('profile', __name__)

# Perfil de usuario
@profile_bp.route('/user', methods=['GET'])
@require_jwt_and_roles(allowed_roles=['user'])
def profile():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Bienvido a tu perfil, usuario {current_user}!"}), 200

# Perfil de administrador
@profile_bp.route('/admin', methods=['GET'])
@require_jwt_and_roles(allowed_roles=['admin'])
def admin_profile():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Bienvido a tu perfil, usuario {current_user}!"}), 200