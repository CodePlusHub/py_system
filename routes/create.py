from flask import Blueprint, render_template, request, current_app, redirect, url_for, session
import requests
import os
import json

create_bp = Blueprint("create", __name__)

# ✅ دالة لقراءة اسم ملف React من manifest.json
def get_react_entry():
    manifest_path = os.path.join("static", "react", "manifest.json")
    try:
        with open(manifest_path, "r") as f:
            manifest = json.load(f)
        return manifest["src/main.jsx"]["file"]
    except Exception as e:
        print("⚠️ Error reading React manifest:", e)
        return None

@create_bp.route("/create", methods=["GET", "POST"])
def create_post():
    new_post_link = session.pop("new_post_link", None)
    error = session.pop("error", None)

    if request.method == "POST":
        site = request.form.get("site")
        title = request.form.get("title")
        content = request.form.get("content")

        api_url = f"{site}/wp-json/myapi/v1/create-post"
        secret_key = "KZ938sdnX21"

        try:
            response = requests.post(api_url, json={
                "key": secret_key,
                "title": title,
                "content": content
            })
            response.raise_for_status()
            result = response.json()

            if result.get("success"):
                session["new_post_link"] = result.get("link")
            else:
                session["error"] = result.get("error", "فشل غير معروف")

        except Exception as e:
            session["error"] = str(e)

        return redirect(url_for("create.create_post"))

    # ✅ تمرير اسم ملف React إلى create.html
    react_entry = get_react_entry()

    return render_template("create.html",
                           sites=current_app.config["SITES"],
                           new_post_link=new_post_link,
                           error=error,
                           react_entry=react_entry)
