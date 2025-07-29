from flask import Blueprint, render_template, current_app
import requests

main_bp = Blueprint("main", __name__)

def get_all_articles():
    articles = []
    for site in current_app.config["SITES"]:
        try:
            res = requests.get(f"{site}/wp-json/wp/v2/posts")
            res.raise_for_status()
            posts = res.json()
            for post in posts:
                articles.append({
                    "title": post.get("title", {}).get("rendered", ""),
                    "site": site,
                    "link": post.get("link", ""),
                })
        except Exception as e:
            print(f"Error with {site}: {e}")
    return articles

@main_bp.route("/")
def index():
    articles = get_all_articles()
    return render_template("index.html", articles=articles, sites=current_app.config["SITES"])
