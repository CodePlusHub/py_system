import os
from flask import Flask
from dotenv import load_dotenv  # 🟢 مهم جداً
from config import WORDPRESS_SITES

load_dotenv()  # ✅ ده اللي يقرأ ملف .env

def create_app():
    app = Flask(__name__)
    app.config["SITES"] = WORDPRESS_SITES

    # 🔐 سر تشفير الجلسات
    app.secret_key = os.getenv("SECRET_KEY", os.urandom(32))  # fallback لو المفتاح مش موجود

    # استدعاء المسارات
    from routes.main import main_bp
    from routes.create import create_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(create_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
