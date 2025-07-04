from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")
chat = model.start_chat()


app = Flask(__name__, static_folder="")

@app.route("/")
def serve_html():
    return send_from_directory("", "main.html")

@app.route("/chat", methods=["POST"])
def chat_with_gemini():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please say something!"})

    try:
        response = chat.send_message(user_message)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
