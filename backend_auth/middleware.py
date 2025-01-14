from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps

def require_jwt_and_roles(allowed_roles):
    """
    Decorador que verifica si el JWT es válido y si el rol del usuario es permitido
    :param allowed_roles: Lista de roles permitidos
    """
    def decorator_function(endpoint_function):
        @wraps(endpoint_function)
        def wrapper_function(*args, **kwargs):
            try:
                verify_jwt_in_request(locations=["cookies"])                

                role = get_jwt()["role"]
                                
                if role not in allowed_roles:
                    return jsonify({"error": "Acceso denegado, rol no permitido"}), 403

                # si el JWT es valido y el rol es permitido, se llama al endpoint
                return endpoint_function(*args, **kwargs)
            except Exception as error:
                return jsonify({"error": "Unauthorized", "message": str(error)}), 401
        return wrapper_function
    return decorator_function
