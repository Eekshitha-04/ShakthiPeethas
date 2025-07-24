from flask import Flask, request, send_file, jsonify
from gtts import gTTS
import os

app = Flask(__name__)

@app.route("/speak", methods=["POST"])
def speak():
    data = request.get_json()
    text = data.get("text", "")
    lang = data.get("lang", "en")  # Default to English

    if not text.strip():
        return jsonify({"error": "Empty text"}), 400

    try:
        tts = gTTS(text=text, lang=lang)
        filename = "static/audio.mp3"
        tts.save(filename)
        return send_file(filename, mimetype="audio/mpeg")
    except Exception as e:
        print("Error generating speech:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
