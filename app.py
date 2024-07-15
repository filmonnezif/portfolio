from flask import Flask, render_template, send_from_directory, request, jsonify
from telebot import TeleBot


BOT_TOKEN = "6899951358:AAFA7pus9S4sFalgUD8zOpltoJWscWS4Z6M"

CHAT_ID = 1802788816

bot = TeleBot(BOT_TOKEN)
app = Flask(__name__)

@app.route('/')
def portfolio():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory("static",filename)

@app.route('/send_message', methods=['POST'])
def send_message():
        data = request.get_json()
        name = data.get('name')
        message = data.get('message')
        print(name, message)
        bot.send_message(chat_id=CHAT_ID, text=f"{name}:\n{message}")
        return jsonify({'status':'OK'})
    
@app.route('/check', methods=['POST'])
def check():
        data = request.get_json()
        btn1 = None if data.get('btn1') == '?' else int(data.get('btn1'))
        btn2 = None if data.get('btn2') == '?' else int(data.get('btn2'))
        btn3 = None if data.get('btn3') == '?' else int(data.get('btn3'))
        level = data.get('level')
        match level:
            case 0:
                if btn1 and btn3:
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})
            case 1:
                if btn1 or btn3:
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})
            case 2:
                if btn1 ^ btn3:
                    print(btn1 ^ btn3)
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})
            case 3:
                if not(btn1 ^ btn3):
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})
            case 4:
                if (btn1 and btn2) or btn3:
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})
            case 5:
                if (btn1 or btn2) ^ btn3:
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})
            case 6:
                if (btn1 or btn2) ^ (btn2 and btn3):
                    return jsonify({'status':'on'})
                else:
                    return jsonify({'status':'off'})


app.run(debug=True, port=5002)



