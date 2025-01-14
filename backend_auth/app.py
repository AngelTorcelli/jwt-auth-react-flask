from flask import Flask
from flask_jwt_extended import JWTManager
from endpoints.auth import auth_bp
from endpoints.profile import profile_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:5173'])

# Configuración de JWT
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Cambiar a una clave más segura
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 300  # Tiempo de expiración del token en segundos

jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(profile_bp, url_prefix='/profile')

if __name__ == '__main__':
    app.run(debug=True)
