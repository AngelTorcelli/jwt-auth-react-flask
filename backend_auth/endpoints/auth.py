from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, get_jwt, jwt_required
from db import abrir_conexion

from bcrypt import hashpw, gensalt, checkpw


def encriptar(password):
    hashed = hashpw(password.encode('utf-8'), gensalt())
    return hashed

def verificar(password, hashed):
    return checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    mydb = abrir_conexion()
    query = "SELECT * FROM users WHERE email = %s"
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(query, (email,))
    user = cursor.fetchone()
    cursor.close()    

    if user:
        return jsonify({"error": "El correo ya esta registrado"}), 400

    hashed_password = encriptar(password)
    
    query = "INSERT INTO users (email, role, password) VALUES (%s, %s, %s)"
    values = (email, role, hashed_password)
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(query, values)
    mydb.commit()
    cursor.close()
    mydb.close()


    return jsonify({"message": "Usuario registrado exitosamente"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    mydb = abrir_conexion()
    query = "SELECT * FROM users WHERE email = %s"
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(query, (email,))
    user = cursor.fetchone()
    cursor.close()
    mydb.close()

    if not user:
        return jsonify({"error": "Credenciales incorrectas"}), 401
    
    pass_hashed = user['password']

    if not verificar(password, pass_hashed):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    # token de acceso
    access_token = create_access_token(identity=email, additional_claims={"role": user['role']})
    response = jsonify({"message": "Login exitoso", "role": user['role']})
    set_access_cookies(response, access_token)
    return response, 200


@auth_bp.route('/verify-role', methods=['GET'])
@jwt_required(locations=["cookies"])
def verify_role():
    claims = get_jwt()
    role = claims.get('role') 
    return jsonify(role=role), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout exitoso"})
    response.delete_cookie('access_token_cookie')    
    return response, 200